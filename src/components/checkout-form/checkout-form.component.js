import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalBox from "../modal-box/modal-box.component";

import CustomButton from "../custom-button/custom-button.component";
import {
  checkoutStart,
  clearCheckoutMessage,
} from "../../redux/cart/cart.actions";

import "./checkout-form.styles.scss";

const CheckoutForm = ({ total }) => {
  const items = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.user.token);

  const message = useSelector((state) => state.cart.message);

  const [open, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(checkoutStart(items, token));
  };

  useEffect(() => {
    if (message) {
      setOpenModal(true);
      setModalText(message);
    }
  }, [message]);

  const closeModal = () => {
    dispatch(clearCheckoutMessage());
    setOpenModal(false);
  };

  const handleModalButtonClick = () => {
    dispatch(clearCheckoutMessage());
    setOpenModal(false);
  };

  return (
    <>
      <CustomButton
        role="link"
        onClick={handleClick}
        value="CHECKOUT"
        name="checkout"
        classValue={`checkout-form-button ${!total && "disabled"}`}
        disabled={!total}
      />

      <ModalBox
        text={modalText}
        open={open}
        closeModal={closeModal}
        handleModalButtonClick={handleModalButtonClick}
        buttonValue="CLOSE"
      />
    </>
  );
};

export default CheckoutForm;
