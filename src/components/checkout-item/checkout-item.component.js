import React from "react";
import { connect } from "react-redux";
import {
  removeItem,
  addCartItem,
  clearItem,
} from "../../redux/cart/cart.actions";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem, removeItem, addCartItem, clearItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="checkout-span image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="checkout-span name">{name}</span>
      <span className="checkout-span quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addCartItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="checkout-span price">${price}</span>

      <div
        onClick={() => clearItem(cartItem)}
        className="checkout-span remove-button"
      >
        &#10005;
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeItem(item)),
  addCartItem: (item) => dispatch(addCartItem(item)),
  clearItem: (item) => dispatch(clearItem(item)),
});
export default connect(null, mapDispatchToProps)(CheckoutItem);
