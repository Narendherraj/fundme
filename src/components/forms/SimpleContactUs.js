import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-blue-500 text-pink-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-blue-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-blue-700 hocus:-translate-y-px hocus:shadow-xl`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 text-red-300 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-blue-500 fill-current w-24`;

var buttonEnable = false;

const SimpleContactUs = () => {
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({
    campaignCollectedAmount: 0,
    campaignInfo: "",
    campaignLastDate: "",
    campaignModeratorStage: "",
    campaignName: "",
    campaignTotalAmount: 0,
    createdBy: "",
    donators: [],
    imagePath: "",
    status: "inreview",
    updatedBy: "",
    userEmail: "",
  });

  const handleFormChangeValue = (event, inputField) => {
    const tempCampaign = campaign;
    let value = event.target.value;
    if (inputField === "campaignTotalAmount") {
      value = parseInt(value);
    }
    tempCampaign[inputField] = value;
    setCampaign({
      ...tempCampaign,
    });
    if (
      campaign.campaignName != "" &&
      campaign.campaignInfo != "" &&
      campaign.userEmail != "" &&
      campaign.campaignLastDate != "" &&
      campaign.campaignTotalAmount != 0
    ) {
      buttonEnable = true;
    } else {
      buttonEnable = false;
    }
  };

  const handleSubmit = (event) => {
    var data;
    event.preventDefault();
    axios.post("http://127.0.0.1:5000", campaign).then((response) => data);
    swal("Done!", "Campaign Successfully Created!", "success");
    navigate("/components/innerPages/BrowseCampaignPage");
  };
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      const file = e.target.files[0];
      let fileBase64 = "";
      getBase64(file, (result) => {
        fileBase64 = result;
        campaign.imagePath = fileBase64;
      });
    }
  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Organize an Campaign</h2>
            <form onSubmit={handleSubmit}>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">Your Name *</Label>
                    <Input
                      id="name-input"
                      type="text"
                      name="name"
                      value={campaign.createdBy}
                      onChange={(event) =>
                        handleFormChangeValue(event, "createdBy")
                      }
                      placeholder="E.g. Eren Yeager"
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="name-input">Campaign Title *</Label>
                    <Input
                      id="name-input"
                      type="text"
                      name="name"
                      value={campaign.campaignName}
                      onChange={(event) =>
                        handleFormChangeValue(event, "campaignName")
                      }
                      placeholder="E.g Fund for Cause"
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">Your Email Address *</Label>
                    <Input
                      id="email-input"
                      type="email"
                      name="email"
                      value={campaign.userEmail}
                      onChange={(event) =>
                        handleFormChangeValue(event, "userEmail")
                      }
                      placeholder="E.g. eren@gmail.com"
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">Campaign Goal Date *</Label>
                    <Input
                      id="date-input"
                      type="date"
                      value={campaign.campaignLastDate}
                      onChange={(event) =>
                        handleFormChangeValue(event, "campaignLastDate")
                      }
                      name="date"
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">Campaign Image</Label>
                    <Input
                      id="date-input"
                      onChange={imgFilehandler}
                      type="file"
                      name="file"
                      accept="image/*"
                    />
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer tw="flex-1">
                    <Label htmlFor="name-input">Campaign Information *</Label>
                    <TextArea
                      id="message-input"
                      name="message"
                      value={campaign.campaignInfo}
                      onChange={(event) =>
                        handleFormChangeValue(event, "campaignInfo")
                      }
                      placeholder="E.g. Details about your campaign for which you want to raise money"
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">Campaign Fund $ * </Label>
                    <Input
                      id="fund-input"
                      type="number"
                      name="email"
                      value={campaign.campaignTotalAmount}
                      onChange={(event) =>
                        handleFormChangeValue(event, "campaignTotalAmount")
                      }
                      placeholder="E.g. 100"
                    />
                  </InputContainer>
                </Column>
              </TwoColumn>
              <SubmitButton hidden={!buttonEnable} type="submit" value="Submit">
                Submit
              </SubmitButton>
              <Paragraph hidden={buttonEnable}>
                {" "}
                Please fill in all the required information
              </Paragraph>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};

export default SimpleContactUs;
