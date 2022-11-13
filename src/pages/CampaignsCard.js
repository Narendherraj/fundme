import React, { useState } from "react";
import ProgressBar from "../components/cards/ProgressBar";
import moment from "moment/moment";
import tw from "twin.macro";
import styled from "styled-components";
import DonateModalInfo from "../components/cards/DonateModalInfo";
import DonateModal from "../components/cards/DonateModal";

const CardImageNew = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-gray-200 h-80 bg-cover bg-center rounded-l-2xl`,
]);

const SubmitButton = tw.button`sm:w-32 py-3 bg-gray-100 text-blue-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-blue-700 hocus:-translate-y-px hocus:shadow-xl`;

const CampaignsCard = ({ campaign, inReview, goalReached }) => {
  const calculateDaysLeft = (presentDate, goalDate) => {
    return presentDate.diff(goalDate, "days");
  };

  const presentDate = moment(new Date());

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [campaignId, setCampaignId] = useState(null);
  const [campaignN, setCampaignN] = useState({});
  const [showPaymentCard, setShowPaymentCard] = useState(false);

  const closeInfoModal = () => {
    setShowInfoModal(false);
  };

  const readMoreHandler = (campaignId, campaign) => {
    setShowInfoModal(true);
    setShowPaymentCard(false);
    setCampaignId(campaignId);
    setCampaignN(campaign);
  };

  const donateNowHandler = (campaignId, campaign) => {
    setShowPaymentCard(true);
  };

  const showPaymentCardHandler = (campaignId, campaign) => {
    setShowInfoModal(true);
    setShowPaymentCard(true);
    setCampaignId(campaignId);
    setCampaignN(campaign);
  };

  return (
    <>
      {showInfoModal ? (
        <DonateModal
          modalIsOpen={showInfoModal}
          closeModal={closeInfoModal}
          campaignId={campaignId}
          campaign={campaignN}
          inReview={inReview}
          goalReached={goalReached}
          showPaymentCard={showPaymentCard}
          showPaymentCardHandler={showPaymentCardHandler}
        />
      ) : null}
      <div className="w-11/12 bg-blue-500 dark:bg-gray-800 mx-auto  rounded-2xl shadow-lg flex flex-wrap sm:flex-row gap-0 select-none mb-28">
        <div className="h-fit overflow-hidden lg:w-5/12 sm:w-full rounded-l-2xl">
          <CardImageNew imageSrc={campaign.imagePath} />
        </div>
        <div className="flex flex-col flex-1 gap-0">
          <div className="flex flex-col gap-2">
            <div className="w-full h-fit max-h-16 overflow-clip m-4 rounded-2xl">
              <div className="rounded font-bold text-white text-2xl">
                {campaign.campaignName}
              </div>
            </div>
            <div className="w-full h-fit rounded-2xl mt-4">
              <div className="w-full h-full md:h-full md:w-full relative overflow-hidden">
                <div className="h-fit flex flex-row rounded text-white text-lg">
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
                      <p className="text-blue-200 text-sm">Days Left</p>
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
                  <div className="flex items-center m-auto text-blue-500 rounded justify-between">
                    <span className="rounded-lg p-2 bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 10c1.103 0 2 .897 2 2s-.897 2-2 2h-18c-1.103 0-2-.897-2-2s.897-2 2-2h18zm3 2c0-1.657-1.343-3-3-3h-18c-1.657 0-3 1.343-3 3s1.343 3 3 3h18c1.657 0 3-1.343 3-3zm-9-1h-12c-.552 0-1 .448-1 1s.448 1 1 1h12c.552 0 1-.448 1-1s-.448-1-1-1z" />
                      </svg>
                    </span>
                    <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                      <p className="text-white text-lg">
                        {goalReached ? (
                          <ProgressBar
                            progressPercentage={100}
                            fundsRaised={campaign.campaignCollectedAmount}
                            fundsNeeded={campaign.campaignTotalAmount}
                          />
                        ) : (
                          <ProgressBar
                            progressPercentage={
                              (campaign.campaignCollectedAmount /
                                campaign.campaignTotalAmount) *
                              100
                            }
                            fundsRaised={campaign.campaignCollectedAmount}
                            fundsNeeded={campaign.campaignTotalAmount}
                          />
                        )}
                      </p>
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
                        <path d="M6 12c0 2.206 1.794 4 4 4 1.761 0 3.242-1.151 3.775-2.734l2.224-1.291.001.025c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6c1.084 0 2.098.292 2.975.794l-2.21 1.283c-.248-.048-.503-.077-.765-.077-2.206 0-4 1.794-4 4zm4-2c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2l-.002-.015 3.36-1.95c.976-.565 2.704-.336 3.711.159l4.931-2.863-3.158-1.569.169-3.632-4.945 2.87c-.07 1.121-.734 2.736-1.705 3.301l-3.383 1.964c-.29-.163-.621-.265-.978-.265zm7.995 1.911l.005.089c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8c1.475 0 2.853.408 4.041 1.107.334-.586.428-1.544.146-2.18-1.275-.589-2.69-.927-4.187-.927-5.523 0-10 4.477-10 10s4.477 10 10 10c5.233 0 9.521-4.021 9.957-9.142-.301-.483-1.066-1.061-1.962-.947z" />
                      </svg>
                    </span>
                    <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                      <p className="text-white text-lg">
                        {`${(
                          (campaign.campaignCollectedAmount /
                            campaign.campaignTotalAmount) *
                          100
                        ).toFixed(2)}%`}
                      </p>
                      <p className="text-blue-200 text-sm">Goal Achieved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-auto mt-6">
              {/*<span className="px-2 py-1 w-fit m-3 mr-4 mt-4 items-center text-xs rounded-md font-semibold text-green-700 bg-green-50 uppercase">*/}
              {/*  {`STATUS : ${campaign.status}`}*/}
              {/*</span>*/}
              <span className="px-2 py-1 w-fit m-3 mt-4 items-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100">
                {`START DATE : ${moment(campaign.createdAt).format("LL")}`}
              </span>
              <span className="px-2 py-1 w-fit m-3 mt-4 items-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100">
                {`END DATE : ${moment(campaign.campaignLastDate).format("LL")}`}
              </span>
              <span className="px-2 py-1 w-fit m-3 mt-4 items-center font-semibold text-xs rounded-md text-green-600 border border-green-600 bg-white">
                MEDIUM PRIORITY
              </span>
            </div>
          </div>
          <div className="mt-20 md:mt-6 mb-8 flex flex-row-reverse gap-3">
            {inReview ? null : (
              <div className=" w-fit h-8 rounded-full mr-4">
                <SubmitButton
                  onClick={() => {
                    showPaymentCardHandler(campaign.campaignId, campaign);
                  }}
                >
                  Donate Now
                </SubmitButton>
              </div>
            )}
            {inReview ? (
              <div className="w-fit h-8 ml-4 mr-10 rounded-full right-0">
                <SubmitButton
                  onClick={() => {
                    readMoreHandler(campaign.campaignId, campaign);
                  }}
                >
                  Read More
                </SubmitButton>
              </div>
            ) : (
              <div className="w-fit h-8 ml-4 rounded-full right-0">
                <SubmitButton
                  onClick={() => {
                    readMoreHandler(campaign.campaignId, campaign);
                  }}
                >
                  Read More
                </SubmitButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignsCard;
