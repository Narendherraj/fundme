import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const ProgressBar = ({ progressPercentage=0, fundsRaised, fundsNeeded }) => {

    const ProgressOuter = styled.div`
      ${tw`w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700`}
    `
    const ProgressInner = styled.div`
      ${tw`bg-blue-600 h-2 rounded-full`}
    `
    const Title = tw.h6`text-sm mb-3`;
    const FundsText = styled.span`
        ${tw`text-sm font-bold`}
    `
    return (
        <>
        <Title><FundsText>&#8377; {fundsRaised}</FundsText> raised out of {fundsNeeded}</Title>
            <ProgressOuter><ProgressInner style={{width:`${progressPercentage}%`}}/></ProgressOuter>
        </>

    );
};

export default ProgressBar;