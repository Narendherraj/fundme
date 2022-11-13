import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import moment from "moment";

const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-gray-200 h-2/6 p-3 h-56 sm:h-64 bg-cover bg-center`,
]);

const DonateModalInfo = ({
  campaign,
  showPaymentCard,
  showPaymentCardHandler,
  closeModal,
  inReview,
  goalReached,
}) => {
  const calculateDaysLeft = (presentDate, goalDate) => {
    return presentDate.diff(goalDate, "days");
  };

  const [paymentCardVisible, setPaymentCardVisible] = useState(showPaymentCard);

  const presentDate = moment(new Date());

  const divContainerClassWithPaymentForm =
    "bg-white flex flex-col w-4/6 mx-auto shadow-lg";
  const divContainerClassWithoutPaymentForm =
    "bg-white flex flex-col w-full h-3/4 mx-auto shadow-lg";
  const divContainerClass = paymentCardVisible
    ? divContainerClassWithPaymentForm
    : divContainerClassWithoutPaymentForm;

  const statsContainerClassWithPaymentForm =
    "flex items-center m-4 text-blue-500 rounded justify-between";
  const statsContainerClassWithoutPaymentForm =
    "flex items-center m-auto text-blue-500 rounded justify-between";
  const statsContainerClass = paymentCardVisible
    ? statsContainerClassWithPaymentForm
    : statsContainerClassWithoutPaymentForm;

  const infoCardContainerClassWithPaymentCard =
    "shadow-lg bg-blue-500 w-full h-full md:h-full md:w-full p-6 bg-white dark:bg-gray-800 relative overflow-hidden";
  const infoCardContainerClassWithoutPaymentCard =
    "shadow-lg bg-blue-500 w-full h-96 md:h-96 md:w-full p-6 bg-white dark:bg-gray-800 relative overflow-hidden";
  const infoCardContainerClass = paymentCardVisible
    ? infoCardContainerClassWithPaymentCard
    : infoCardContainerClassWithoutPaymentCard;

  const CloseButton = tw.button`w-full sm:w-32 bg-red-500 text-white mb-1 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-blue-700 hocus:-translate-y-px hocus:shadow-xl`;
  const SubmitButton = tw.button`w-full sm:w-32 bg-gray-100 text-blue-500 mb-1 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-blue-700 hocus:-translate-y-px hocus:shadow-xl`;

  return (
    <>
      <div className={divContainerClass}>
        <div>
          <CardImage imageSrc={campaign.imagePath} />
          {/*<CardImage imageSrc="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80" />*/}
        </div>
        <div className="flex-1">
          <div className={infoCardContainerClass}>
            <div className="h-8 flex flex-row rounded text-white text-lg">
              <div className={statsContainerClass}>
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
              <div className={statsContainerClass}>
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
              <div className={statsContainerClass}>
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
              <div className={statsContainerClass}>
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
              {paymentCardVisible ? null : (
                <div className={statsContainerClass}>
                  <span className="rounded-lg p-2 bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.223 14.867l-1.28-1.85c-.944-1.361-.605-3.23.757-4.174l1.848-1.282 2.99 4.315-4.315 2.991zm5.549-3.844l4.316-2.989-1.282-1.849c-.942-1.363-2.812-1.702-4.174-.758l-1.851 1.281 2.991 4.315zm-4.694 5.078l2.99 4.316c1.164 1.681 3.035 2.583 4.936 2.583 3.284 0 5.996-2.666 5.996-6.006 0-1.179-.346-2.369-1.068-3.412l-2.989-4.314-9.865 6.833zm-4.47-6.77c.353-1.73-.451-2.938-1.033-4.231-1.024-2.284 1.565-3.706 3.042-1.643.193.27 2.067 2.863 2.067 2.863l1.191-.835-2.074-2.876c-.801-1.12-1.895-1.609-2.94-1.609-2.114 0-3.592 2.2-2.665 4.565.478 1.218 1.282 2.019.985 3.474-.247 1.207-1.803 2.077-3.367 1.023l-.814 1.209c2.463 1.658 5.164.238 5.608-1.94z" />
                    </svg>
                  </span>
                  <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                    <p className="text-red-500 text-sm">
                      <CloseButton onClick={closeModal}>Close</CloseButton>
                    </p>
                    {inReview || goalReached ? null : (
                      <p className="text-blue-200 text-sm">
                        <SubmitButton>Donate Now</SubmitButton>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-row t-50">
              <span className="px-2 py-1 w-fit m-3 mr-4 mt-4 items-center text-xs rounded-md font-semibold text-green-700 bg-green-50 uppercase">
                {`STATUS : ${campaign.status}`}
              </span>
              <span className="px-2 py-1 w-fit m-3 mt-4 items-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100">
                {`START DATE : ${moment(campaign.createdAt).format("ll")}`}
              </span>
              <span className="px-2 py-1 w-fit m-3 mt-4 items-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100">
                {`END DATE : ${moment(campaign.campaignLastDate).format("ll")}`}
              </span>
              <span className="px-2 py-1 w-fit m-3 mt-4 items-center font-semibold text-xs rounded-md text-green-600 border border-green-600 bg-white">
                MEDIUM PRIORITY
              </span>
            </div>

            <div className="h-8 ml-4 mb-0 rounded text-white text-lg">
              {campaign.campaignName}
            </div>
            <div className="h-4/6 max-h-60 ml-4 rounded text-white text-lg overflow-y-scroll">
              {campaign.campaignInfo}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonateModalInfo;
