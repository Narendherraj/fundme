import React, {useState} from "react";
import Modal from 'react-modal';
import tw from "twin.macro";
import axios from "axios";
import {PrimaryButton as PrimaryButtonBase} from "../misc/Buttons";
import styled from "styled-components";
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg";

const CloseButton = tw(PrimaryButtonBase)`bg-red-500 mt-auto sm:text-sm rounded-none w-auto h-auto mr-2`;
const PayButton = tw(PrimaryButtonBase)`mt-auto sm:text-sm rounded-none w-auto h-auto`;

const customStyles = {
    content:{
        width:"80%",
        height:"88%",
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50%,-50%)',
    },
}

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-5 lg:py-5`;

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

const SvgDotPattern1 = tw(
    SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-blue-500 fill-current w-24`;


const DonateModal = ({modalIsOpen, closeModal, campaignId })=>{

    console.log(campaignId)

    const [donations, setDonations] = useState({
        name:"",
        email:"",
        remarks:"",
        amount:0
    })

    const handleFormChangeInput = (event, inputField)=>{
        const tempDonations = donations;
        let value = event.target.value;
        if (inputField === 'amount'){ value = parseInt(value) }
        tempDonations[inputField] = value;
        setDonations({
            ...tempDonations
        })
    }

    const submitDonationFormHandler = (event)=>{
        event.preventDefault();
        axios.put(`http://127.0.0.1:5000/${campaignId}`, donations)
            .then(response => {
                const {name, amount} = response.data;
            })
    }

    return(
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Donate Modal"
        >
            <Container>
                <Content>
                    <FormContainer>
                        <div tw="max-w-4xl">
                            <h2>Send Your Contribution</h2>
                            <form>
                                <Column>
                                    <InputContainer>
                                        <Label htmlFor='name-input'>Name *</Label>
                                        <Input
                                            id='name-input'
                                            type='text'
                                            name='name'
                                            value={donations.name}
                                            onChange={event=>handleFormChangeInput(event, 'name')}
                                            placeholder='Donator Name'
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Label htmlFor="email-input">Email *</Label>
                                        <Input
                                            id="email-input"
                                            type="email"
                                            name="email"
                                            value={donations.email}
                                            onChange={event=>handleFormChangeInput(event, 'email')}
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
                                            onChange={event=>handleFormChangeInput(event, 'amount')}
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
                                            onChange={event=>handleFormChangeInput(event, 'remarks')}
                                            placeholder="Any Remarks you have ?"
                                        />
                                    </InputContainer>

                                </Column>
                                <CloseButton onClick={closeModal}>Close</CloseButton>
                                <PayButton onClick={event =>submitDonationFormHandler(event)}>Pay Now</PayButton>
                            </form>
                        </div>
                    </FormContainer>
                </Content>
            </Container>
        </Modal>
    )

}

export default DonateModal;