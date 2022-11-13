import React, { useEffect, useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import tw from "twin.macro";
import moment from "moment";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import axios from "axios";

import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

import { SectionHeading } from "components/misc/Headings";
import { ReactComponent as ClockIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as HeartIcon } from "feather-icons/dist/icons/heart.svg";
import styled from "styled-components";
import ProgressBar from "../components/cards/ProgressBar";
import DonateModal from "../components/cards/DonateModal";
import CampaignsCard from "../pages/CampaignsCard";
import Slider from "react-slick";

const Container = tw.div`relative`;
const FlexCard = tw.div`lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid gap-2  mb-6`;
const Content = tw.div`max-w-screen-xl mx-auto py-4 lg:py-4`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none flex`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center`,
]);

const CardImageNew = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-gray-200 h-80 bg-cover bg-center rounded-l-2xl`,
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
`;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Description = tw.p`text-sm leading-loose mt-2 sm:mt-2 sm:mb-4 text-clip overflow-hidden h-20`;
const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const PrimaryButton = tw(
  PrimaryButtonBase
)`bg-blue-500 text-gray-100 hover:bg-blue-700 mt-auto sm:text-lg rounded-none w-full py-3 sm:py-6`;

const SubmitButton = tw.button`sm:w-32 py-3 bg-gray-100 text-blue-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-blue-700 hocus:-translate-y-px hocus:shadow-xl`;

const BrowseCampaign = () => {
  const presentDate = moment(new Date());
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateCampaignId, setDonateCampaignId] = useState(null);

  const [campaigns, setCampaigns] = useState([]);
  const [campaignI, setCampaignI] = useState({});

  const tempCampaign = {
    campaignName:
      "Lorem Ipsum is simply dummy text of Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
      "\nthe printing and typesetting industry. Lorem Ipsum has been the",
    userEmail: "efr@w.com",
    campaignInfo: "Dog Food Collection",
    campaignTotalAmount: 5000,
    campaignCollectedAmount: 1100,
    campaignModeratorStage: "Passed",
    campaignLastDate: "2022-12-10",
    donators: [
      {
        amount: 400,
        name: "A",
      },
      {
        amount: 100,
        name: "B",
      },
      {
        name: "Neel",
        amount: 600,
      },
    ],
    status: "inreview",
    imagePath:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
    campaignId: 1,
    createdBy: "Rick",
    createdAt: "2022-11-11 11:30:19.367387",
    updatedBy: "Neel",
    updatedAt: "2022-11-11 11:33:10.368317",
  };

  //used to get the data from api and store in state
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000")
      .then((response) => setCampaigns(response.data));
  }, []);

  const closeModal = () => {
    setShowDonateModal(false);
  };

  const calculateDaysLeft = (presentDate, goalDate) => {
    return presentDate.diff(goalDate, "days");
  };

  const activeCampaigns = (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Active Campaigns</Heading>
        </HeadingWithControl>
        {campaigns.map((campaign) =>
          campaign.status && campaign.status !== "goalReached" ? (
            <CampaignsCard
              key={campaign.campaignId}
              campaign={campaign}
              inReview={false}
              goalReached={false}
            />
          ) : null
        )}
      </Content>
    </Container>
  );

  const inReviewCampaigns = (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>In Review Campaigns</Heading>
        </HeadingWithControl>
        {campaigns.map((campaign) =>
          campaign.status === "inreview" ? (
            <CampaignsCard
              key={campaign.campaignId}
              campaign={campaign}
              inReview={true}
              goalReached={false}
            />
          ) : null
        )}
      </Content>
    </Container>
  );

  const goalReachedCampaigns = (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Goal Reached Campaigns</Heading>
        </HeadingWithControl>
        {campaigns.map((campaign) =>
          campaign.status === "goalReached" ? (
            <CampaignsCard
              key={campaign.campaignId}
              campaign={campaign}
              inReview={true}
              goalReached={true}
            />
          ) : null
        )}
      </Content>
    </Container>
  );

  return (
    <AnimationRevealPage>
      <Header />
      {showDonateModal ? (
        <DonateModal
          campaignId={donateCampaignId}
          campaign={campaignI}
          modalIsOpen={showDonateModal}
          closeModal={closeModal}
        />
      ) : null}
      {activeCampaigns}
      {inReviewCampaigns}
      {goalReachedCampaigns}
      <Footer />
    </AnimationRevealPage>
  );
};

export default BrowseCampaign;
