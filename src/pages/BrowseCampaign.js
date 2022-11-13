import React, { useEffect, useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import tw from "twin.macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import axios from "axios";

import { SectionHeading } from "components/misc/Headings";
import DonateModal from "../components/cards/DonateModal";
import CampaignsCard from "../pages/CampaignsCard";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-4 lg:py-4`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;

const BrowseCampaign = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateCampaignId, setDonateCampaignId] = useState(null);

  const [campaigns, setCampaigns] = useState([]);
  const [campaignI, setCampaignI] = useState({});

  //used to get the data from api and store in state
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000")
      .then((response) => setCampaigns(response.data));
  }, []);

  const closeModal = () => {
    setShowDonateModal(false);
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
