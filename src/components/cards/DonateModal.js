import React, { useState } from "react";
import Modal from "react-modal";
import tw from "twin.macro";
import axios from "axios";
import styled from "styled-components";
import DonateModalInfo from "./DonateModalInfo";
import swal from "sweetalert";

const customStyles = {
  content: {
    width: "87%",
    height: "87%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
  },
};

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto p-2 lg:p-2`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-4 w-2/6 bg-blue-500 text-pink-100 relative`}
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

const TwoRow = tw.div`flex flex-row sm:flex-row justify-between`;
const Column = tw.div`sm:w-11/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 ml-10 py-3 bg-gray-100 text-blue-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-blue-700 hocus:-translate-y-px hocus:shadow-xl`;
const CloseButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-red-100 text-red-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-red-300 hover:text-red-700 hocus:-translate-y-px hocus:shadow-xl`;

const DonateModal = ({
  modalIsOpen,
  closeModal,
  campaignId,
  campaign,
  inReview,
  goalReached,
  showPaymentCard,
}) => {
  console.log(campaignId);

  const [donations, setDonations] = useState({
    name: "",
    email: "",
    remarks: "",
    amount: 0,
  });

  const handleFormChangeInput = (event, inputField) => {
    const tempDonations = donations;
    let value = event.target.value;
    if (inputField === "amount") {
      value = parseInt(value);
    }
    tempDonations[inputField] = value;
    setDonations({
      ...tempDonations,
    });
  };

  const submitDonationFormHandler = (event) => {
    event.preventDefault();
    axios
      .put(`http://127.0.0.1:5000/${campaignId}`, donations)
      .then((response) => {
        if (response.status === 200) {
          closeModal();
          swal({
            title: "Thank You!",
            text: "Your contribution was received!",
            icon: "success",
          });
        } else {
          swal({
            title: "Oops!",
            text: "There was some problem with payment processing, Please try again!",
            icon: "error",
          });
        }
      });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Donate Modal"
    >
      <Container>
        <Content>
          <TwoRow>
            <DonateModalInfo
              campaign={campaign}
              showPaymentCard={showPaymentCard}
              closeModal={closeModal}
              inReview={inReview}
              goalReached={goalReached}
            />
            {showPaymentCard ? (
              <FormContainer>
                <div className="max-w-4xl">
                  <h2>Send Your Contribution</h2>
                  <form>
                    <Column>
                      <InputContainer>
                        <Label htmlFor="name-input">Name *</Label>
                        <Input
                          id="name-input"
                          type="text"
                          name="name"
                          value={donations.name}
                          onChange={(event) =>
                            handleFormChangeInput(event, "name")
                          }
                          placeholder="Donator Name"
                        />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="email-input">Email *</Label>
                        <Input
                          id="email-input"
                          type="email"
                          name="email"
                          value={donations.email}
                          onChange={(event) =>
                            handleFormChangeInput(event, "email")
                          }
                          placeholder="E.g. eren@uplandsoftware.com"
                        />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="amount-input">Amount *</Label>
                        <Input
                          id="amount-input"
                          type="number"
                          name="amount"
                          value={donations.amount}
                          onChange={(event) =>
                            handleFormChangeInput(event, "amount")
                          }
                          placeholder="100"
                        />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="remarks-input">Remarks</Label>
                        <Input
                          id="remarks-input"
                          type="text"
                          name="remarks"
                          value={donations.remarks}
                          onChange={(event) =>
                            handleFormChangeInput(event, "remarks")
                          }
                          placeholder="Any Remarks you have ?"
                        />
                      </InputContainer>
                    </Column>
                    <CloseButton onClick={closeModal}>Close</CloseButton>
                    <SubmitButton
                      onClick={(event) => submitDonationFormHandler(event)}
                    >
                      Pay Now
                    </SubmitButton>
                  </form>
                </div>
              </FormContainer>
            ) : null}
          </TwoRow>
        </Content>
      </Container>
    </Modal>
  );
};

export default DonateModal;
