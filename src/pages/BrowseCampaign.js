import React, {useEffect, useState} from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import tw from "twin.macro";
import moment from "moment";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import axios from "axios";

import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";


import { SectionHeading } from "components/misc/Headings";
import {ReactComponent as ClockIcon} from "feather-icons/dist/icons/clock.svg";
import {ReactComponent as HeartIcon} from "feather-icons/dist/icons/heart.svg";
import styled from "styled-components";
import ProgressBar from "../components/cards/ProgressBar";
import DonateModal from "../components/cards/DonateModal";
import Slider from "react-slick";

const Container = tw.div`relative`;
const FlexCard = tw.div`grid-cols-3 grid gap-4  mb-6`
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none flex`;
const CardImage = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`w-full h-56 sm:h-64 bg-cover bg-center`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-lg font-bold h-auto`;

const Text = tw.div`ml-2 text-xs font-semibold text-gray-800`;
const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  svg {
    ${tw`w-6 h-6`}
  }
`;
const HeartIconContainer = styled.div`
  ${tw`text-red-600`}
  svg {
    ${tw`w-6 h-6`}
  }
`

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Description = tw.p`text-sm leading-loose mt-2 sm:mt-2 sm:mb-4`;
const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const PrimaryButton = tw(PrimaryButtonBase)`bg-blue-500 text-gray-100 hover:bg-blue-700 mt-auto sm:text-lg rounded-none w-full py-3 sm:py-6`;

const BrowseCampaign = ()=>{


    const presentDate = moment(new Date());
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [donateCampaignId, setDonateCampaignId] = useState(null);

    const [campaigns, setCampaigns] = useState([]);
    const [campaign, setCampaign] = useState({});

    //used to get the data from api and store in state
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000")
            .then(response => setCampaigns(response.data));
    },[])

    const closeModal = ()=>{
        setShowDonateModal(false)
    }

    const calculateDaysLeft = (presentDate, goalDate) => {
        return presentDate.diff(goalDate, 'days')
    }

    const activeCampaigns = (
        <Container>
            <Content>
                <HeadingWithControl>
                    <Heading>Active Campaigns</Heading>
                </HeadingWithControl>
                <FlexCard>
                {campaigns.map((campaign, index)=>(
                    campaign.status ==="active" ?
                        <Card key={campaign.campaignId}>
                            {/*<CardImage imageSrc={campaign.imagePath} />*/}
                            <TextInfo>
                                <TitleReviewContainer>
                                    <Title>{campaign.campaignName}</Title>
                                </TitleReviewContainer>
                                <Description>{campaign.campaignInfo}</Description>
                                <ProgressBar
                                    progressPercentage={(campaign.campaignCollectedAmount / campaign.campaignTotalAmount)*100}
                                    fundsRaised={campaign.campaignCollectedAmount}
                                    fundsNeeded={campaign.campaignTotalAmount}
                                />
                                <SecondaryInfoContainer>
                                    <IconWithText>
                                        <IconContainer>
                                            <ClockIcon />
                                        </IconContainer>
                                        <Text>{`${calculateDaysLeft(moment(campaign.campaignLastDate), presentDate)} Days Left`}</Text>
                                    </IconWithText>
                                    <IconWithText>
                                        <HeartIconContainer>
                                            <HeartIcon />
                                        </HeartIconContainer>
                                        <Text>{`${campaign.donators.length} Supporters`}</Text>
                                    </IconWithText>
                                </SecondaryInfoContainer>
                            </TextInfo>
                            <PrimaryButton onClick={() => {setShowDonateModal(true);setDonateCampaignId(campaign.campaignId); setCampaign(campaign)}}>Donate Now</PrimaryButton>
                        </Card>
                        :null
                ))}
                </FlexCard>
            </Content>
        </Container>

    )

    const inReviewCampaigns = (
        <Container>
            <Content>
                <HeadingWithControl>
                    <Heading>In Review Campaigns</Heading>
                </HeadingWithControl>
                <FlexCard>
                {campaigns.map((campaign, index)=>(
                    campaign.status === 'inreview' ?
                        <Card key={campaign.campaignId}>
                            <CardImage imageSrc={campaign.imagePath} />
                            <TextInfo>
                                <TitleReviewContainer>
                                    <Title>{campaign.campaignName}</Title>
                                </TitleReviewContainer>
                                <Description>{campaign.campaignInfo}</Description>
                                <ProgressBar
                                    progressPercentage={(campaign.campaignCollectedAmount / campaign.campaignTotalAmount)*100}
                                    fundsRaised={campaign.campaignCollectedAmount}
                                    fundsNeeded={campaign.campaignTotalAmount}
                                />
                                <SecondaryInfoContainer>
                                    <IconWithText>
                                        <IconContainer>
                                            <ClockIcon />
                                        </IconContainer>
                                        <Text>{`${calculateDaysLeft(moment(campaign.campaignLastDate), presentDate)} Days Left`}</Text>
                                    </IconWithText>
                                    <IconWithText>
                                        <HeartIconContainer>
                                            <HeartIcon />
                                        </HeartIconContainer>
                                        <Text>{`${campaign.donators.length} Supporters`}</Text>
                                    </IconWithText>
                                </SecondaryInfoContainer>
                            </TextInfo>
                            <PrimaryButton onClick={() => {setShowDonateModal(true);setDonateCampaignId(campaign.campaignId);setCampaign(campaign)}}>Donate Now</PrimaryButton>
                        </Card>
                        :null
                ))}
                </FlexCard>
            </Content>
        </Container>

    )
    return(
        <AnimationRevealPage>
            <Header/>
            {showDonateModal ? (
                <DonateModal campaignId={donateCampaignId} campaign={campaign} modalIsOpen={showDonateModal} closeModal={closeModal}/>
            ) : null}
            {activeCampaigns}
            {inReviewCampaigns}
            <Footer/>
        </AnimationRevealPage>
    )
}

export default BrowseCampaign;