import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import moment from "moment";

const CardImage = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`bg-gray-200 h-2/6 p-3 h-56 sm:h-64 bg-cover bg-center`
]);

const DonateModalInfo = ({campaign})=>{

    return(
        <>
            <div className="bg-white flex flex-col w-4/6 mx-auto shadow-lg">
                <div>
                    <CardImage imageSrc={campaign.imagePath} />
                    {/*<CardImage imageSrc="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80" />*/}
                </div>
                    <div className="flex-1">
                        <div className="shadow-lg bg-blue-500 w-full h-full md:h-full md:w-full p-6 bg-white dark:bg-gray-800 relative overflow-hidden">

                            <div className='h-8 flex flex-row rounded text-white text-lg'>
                                <div className="flex items-center m-4 text-blue-500 rounded justify-between">
                                    <span className="rounded-lg p-2 bg-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z"/></svg>
                                    </span>
                                    <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                                        <p className="text-white text-lg">
                                            45
                                        </p>
                                        <p className="text-blue-200 text-sm">
                                            Days Left
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center m-4 text-blue-500 rounded justify-between">
                                    <span className="rounded-lg p-2 bg-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg>
                                    </span>
                                    <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                                        <p className="text-white text-lg">
                                            {campaign.donators.length}
                                        </p>
                                        <p className="text-blue-200 text-sm">
                                            Supporters
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center m-4 text-blue-500 rounded justify-between">
                                    <span className="rounded-lg p-2 bg-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 10c1.103 0 2 .897 2 2s-.897 2-2 2h-18c-1.103 0-2-.897-2-2s.897-2 2-2h18zm3 2c0-1.657-1.343-3-3-3h-18c-1.657 0-3 1.343-3 3s1.343 3 3 3h18c1.657 0 3-1.343 3-3zm-9-1h-12c-.552 0-1 .448-1 1s.448 1 1 1h12c.552 0 1-.448 1-1s-.448-1-1-1z"/></svg>
                                    </span>
                                    <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                                        <p className="text-white text-lg">
                                            <ProgressBar
                                                progressPercentage={(campaign.campaignCollectedAmount / campaign.campaignTotalAmount)*100}
                                                fundsRaised={campaign.campaignCollectedAmount}
                                                fundsNeeded={campaign.campaignTotalAmount}
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center m-4 text-blue-500 rounded justify-between">
                                    <span className="rounded-lg p-2 bg-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 12c0 2.206 1.794 4 4 4 1.761 0 3.242-1.151 3.775-2.734l2.224-1.291.001.025c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6c1.084 0 2.098.292 2.975.794l-2.21 1.283c-.248-.048-.503-.077-.765-.077-2.206 0-4 1.794-4 4zm4-2c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2l-.002-.015 3.36-1.95c.976-.565 2.704-.336 3.711.159l4.931-2.863-3.158-1.569.169-3.632-4.945 2.87c-.07 1.121-.734 2.736-1.705 3.301l-3.383 1.964c-.29-.163-.621-.265-.978-.265zm7.995 1.911l.005.089c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8c1.475 0 2.853.408 4.041 1.107.334-.586.428-1.544.146-2.18-1.275-.589-2.69-.927-4.187-.927-5.523 0-10 4.477-10 10s4.477 10 10 10c5.233 0 9.521-4.021 9.957-9.142-.301-.483-1.066-1.061-1.962-.947z"/></svg>
                                    </span>
                                    <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                                        <p className="text-white text-lg">
                                            {`${((campaign.campaignCollectedAmount/campaign.campaignTotalAmount)*100).toFixed(2)}%`}
                                        </p>
                                        <p className="text-blue-200 text-sm">
                                            Goal Achieved
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-row'>
                                <span className="px-2 py-1 w-fit m-3 mr-4 mt-4 items-center text-xs rounded-md font-semibold text-green-700 bg-green-50 uppercase">
                                {`STATUS : ${campaign.status}`}
                                </span>
                                <span
                                    className="px-2 py-1 w-fit m-3 mt-4 items-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100">
                                {`START DATE : ${moment(campaign.createdAt).format('ll')}`}
                                </span>
                                <span
                                    className="px-2 py-1 w-fit m-3 mt-4 items-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100">
                                {`END DATE : ${moment(campaign.campaignLastDate).format('ll')}`}
                                </span>
                                <span
                                    className="px-2 py-1 w-fit m-3 mt-4 items-center font-semibold text-xs rounded-md text-green-600 border border-green-600 bg-white">
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
    )
}

export default DonateModalInfo;