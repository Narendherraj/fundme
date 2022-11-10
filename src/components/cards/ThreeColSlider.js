import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
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

  /* Change this according to your needs */
  const cards = [
    {
      imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
      description: "Wyatt Residency",
      title: "My Baby Battles For His Life And We Need Your Support To Save Him",
      daysLeft: "38 Days Left",
      supporters: "549 Supporters",
      fundsRaised:"95,000",
      fundsNeeded:"1,00,000",
      completedPercent: "95",
      rating: "4.8",
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
      description: "Soho Paradise",
      title: "Help End Isolation for Children In Need: Empowering Holistically",
      daysLeft: "39 Days Left",
      supporters: "205 Supporters",
      fundsRaised:"15,000",
      fundsNeeded:"1,00,000",
      completedPercent: "15",
      rating: 4.9,
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
      description: "Hotel Baja",
      title: "Help 14-year-old Anil to experience a beautiful life ahead!",
      daysLeft: "9 Days Left",
      supporters: "238 Supporters",
      fundsRaised:"60,000",
      fundsNeeded:"1,00,000",
      completedPercent: "60",
      rating: "5.0",
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
      title: "Hudak Homes",
      description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      daysLeft: "Arizona, RAK",
      supporters: "USD 99/Day",
      rating: 4.5,
    },
  ]

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
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.imageSrc} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.title}</Title>
                  {/*<RatingsInfo>*/}
                  {/*  <StarIcon />*/}
                  {/*  <Rating>{card.rating}</Rating>*/}
                  {/*</RatingsInfo>*/}
                </TitleReviewContainer>
                <ProgressBar
                    progressPercentage={card.completedPercent}
                    fundsRaised={card.fundsRaised}
                    fundsNeeded={card.fundsNeeded}
                />
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <ClockIcon />
                    </IconContainer>
                    <Text>{card.daysLeft}</Text>
                  </IconWithText>
                  <IconWithText>
                    <HeartIconContainer>
                      <HeartIcon />
                    </HeartIconContainer>
                    <Text>{card.supporters}</Text>
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
