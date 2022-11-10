import React from "react";
import Modal from 'react-modal';
import tw from "twin.macro";
import {PrimaryButton as PrimaryButtonBase} from "../misc/Buttons";

const CloseButton = tw(PrimaryButtonBase)`bg-red-500 mt-auto sm:text-sm rounded-none w-auto h-auto mr-2`;
const PayButton = tw(PrimaryButtonBase)`mt-auto sm:text-sm rounded-none w-auto h-auto`;

const customStyles = {
    content:{
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50%,-50%)',
    },
}

const DonateModal = ({modalIsOpen, closeModal, })=>{

    return(
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <CloseButton onClick={closeModal}>Close</CloseButton>
            <PayButton onClick={closeModal}>Pay Now</PayButton>
        </Modal>
    )

}

export default DonateModal;