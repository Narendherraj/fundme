import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import axios from "axios";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import ProgressBar from "./ProgressBar";
import DonateModal from "./DonateModal";
import moment from "moment/moment";

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
`;
const Card = tw.div`h-full bg-blue-500 dark:bg-gray-800 flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none sm:m-auto`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center`,
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`bg-blue-500 text-gray-100 hover:bg-blue-700 mt-auto sm:text-lg rounded-none w-full py-3 sm:py-6`;
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
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [campaigns, setCampaigns] = useState([]);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [campaignId, setCampaignId] = useState(null);
  const [campaignN, setCampaignN] = useState({});
  const [showPaymentCard, setShowPaymentCard] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000")
      .then((response) => setCampaigns(response.data));
  }, []);

  const closeModal = () => {
    setShowDonateModal(false);
  };

  const showPaymentCardHandler = (campaignId, campaign) => {
    setShowDonateModal(true);
    setShowPaymentCard(true);
    setCampaignId(campaignId);
    setCampaignN(campaign);
  };
  const calculateDaysLeft = (presentDate, goalDate) => {
    return presentDate.diff(goalDate, "days");
  };

  const presentDate = moment(new Date());

  return (
    <Container>
      {showDonateModal ? (
        <DonateModal
          modalIsOpen={showDonateModal}
          closeModal={closeModal}
          campaignId={campaignId}
          campaign={campaignN}
          showPaymentCard={showPaymentCard}
        />
      ) : null}
      <Content>
        <HeadingWithControl>
          <Heading>Active Campaigns</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}>
              <ChevronLeftIcon />
            </PrevButton>
            <NextButton onClick={sliderRef?.slickNext}>
              <ChevronRightIcon />
            </NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {campaigns.map((campaign, index) =>
            campaign.status && campaign.status !== "goalReached" ? (
              <Card key={campaign.campaignId}>
                <CardImage imageSrc={campaign.imagePath} />
                <TextInfo>
                  <div className="w-full h-full max-h-16 overflow-clip mb-4 rounded-2xl">
                    <div className="rounded font-bold text-white text-2xl">
                      {campaign.campaignName}
                    </div>
                  </div>
                  <div className="flex h-full flex-col items-start justify-evenly">
                    <p className="text-white w-11/12 mb-4 text-lg">
                      <ProgressBar
                        progressPercentage={
                          (campaign.campaignCollectedAmount /
                            campaign.campaignTotalAmount) *
                          100
                        }
                        fundsRaised={campaign.campaignCollectedAmount}
                        fundsNeeded={campaign.campaignTotalAmount}
                      />
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex items-center m-auto text-blue-500 rounded justify-between">
                      <span className="rounded-lg p-2 bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z" />
                        </svg>
                      </span>
                      <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                        <p className="text-white text-lg">{`${calculateDaysLeft(
                          moment(campaign.campaignLastDate),
                          presentDate
                        )}`}</p>
                        <p className="text-white text-lg">Days Left</p>
                      </div>
                    </div>
                    <div className="flex items-center m-auto text-blue-500 rounded justify-between">
                      <span className="rounded-lg p-2 bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" />
                        </svg>
                      </span>
                      <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                        <p className="text-white text-lg">
                          {campaign.donators.length}
                        </p>
                        <p className="text-blue-200 text-sm">Supporters</p>
                      </div>
                    </div>
                  </div>
                </TextInfo>

                <PrimaryButton
                  onClick={() =>
                    showPaymentCardHandler(campaign.campaignId, campaign)
                  }
                >
                  Donate Now
                </PrimaryButton>
              </Card>
            ) : null
          )}
        </CardSlider>
      </Content>
    </Container>
  );
};
