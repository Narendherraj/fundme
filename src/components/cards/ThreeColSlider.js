import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import axios from "axios";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import {ReactComponent as ClockIcon} from "feather-icons/dist/icons/clock.svg";
import {ReactComponent as HeartIcon} from "feather-icons/dist/icons/heart.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import ProgressBar from "./ProgressBar";
import DonateModal from "./DonateModal";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-lg font-bold h-24`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

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
const Text = tw.div`ml-2 text-xs font-semibold text-gray-800`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full py-3 sm:py-6`;
export default () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };
  const [campaigns, setCampaigns] = useState([]);

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000')
        .then(response=>setCampaigns(response.data))
  },[])


  const [showDonateModal, setShowDonateModal] = useState(false);

  const closeModal = ()=>{
    setShowDonateModal(false)
  }


  return (
    <Container>
      {showDonateModal ? (
          <DonateModal modalIsOpen={showDonateModal} closeModal={closeModal}/>
      ) : null}
      <Content>
        <HeadingWithControl>
          <Heading>Active Campaigns</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {campaigns.map((campaign, index) => (
            <Card key={campaign.campaignId}>
              <CardImage imageSrc="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80" />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{campaign.campaignName}</Title>
                  {/*<RatingsInfo>*/}
                  {/*  <StarIcon />*/}
                  {/*  <Rating>{card.rating}</Rating>*/}
                  {/*</RatingsInfo>*/}
                </TitleReviewContainer>
                <ProgressBar
                    progressPercentage={campaign.completedPercent}
                    fundsRaised={campaign.campaignCollectedAmount}
                    fundsNeeded={campaign.campaignTotalAmount}
                />
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <ClockIcon />
                    </IconContainer>
                    <Text>{campaign.daysLeft}</Text>
                  </IconWithText>
                  <IconWithText>
                    <HeartIconContainer>
                      <HeartIcon />
                    </HeartIconContainer>
                    <Text>{`${campaign.donators.length} Supporters`}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                {/*<Description>{card.description}</Description>*/}
              </TextInfo>
              <PrimaryButton onClick={() => setShowDonateModal(true)}>Donate Now</PrimaryButton>
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
