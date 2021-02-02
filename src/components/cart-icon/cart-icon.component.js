import React from "react";
import { connect } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.styles.scss";

const CartIcon = ({ dispatch, items }) => {
  return (
    <div onClick={() => dispatch(toggleHidden())} className="cart-icon">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{items.length}</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
});

export default connect(mapStateToProps)(CartIcon);
