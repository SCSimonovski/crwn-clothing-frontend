import React from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

import CustomButton from "../custom-button/custom-button.component";

import "./modal-box.styles.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const ModalBox = ({
  text,
  open,
  closeModal,
  buttonValue,
  handleModalButtonClick,
}) => {
  return (
    <div className="modal-container">
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="button-x-container">
          <button onClick={closeModal} className="button-x">
            <AiOutlineClose />
          </button>
        </div>

        <div className="modal-text">{text}</div>

        <CustomButton
          onClick={handleModalButtonClick}
          value={buttonValue}
          classValue="modal"
        />
      </Modal>
    </div>
  );
};

export default ModalBox;
