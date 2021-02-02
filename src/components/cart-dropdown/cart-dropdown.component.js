import React, { useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { toggleHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ items, history, dispatch }) => {
  const handleClick = (e) => {
    e.preventDefault();
    history.push("/checkout");
    dispatch(toggleHidden());
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOffClick = (e) => {
      if (
        (wrapperRef.current && !wrapperRef.current.contains(e.target)) ||
        (wrapperRef.current && !wrapperRef.current.contains(e.target))
      ) {
        dispatch(toggleHidden());
      }
    };

    window.addEventListener("click", handleOffClick);
    return () => {
      window.removeEventListener("click", handleOffClick);
    };
  }, [dispatch]);

  return (
    <div ref={wrapperRef} className="cart-dropdown">
      <div className="cart-dropdown__cart-items">
        {items.length > 0 ? (
          items.map(({ id, ...itemProps }) => (
            <CartItem key={id} {...itemProps} />
          ))
        ) : (
          <p className="cart-dropdown__empty">Your cart is empty</p>
        )}
      </div>

      <div className="cart-dropdown__button">
        <CustomButton handleClick={handleClick} value="GO TO CHECKOUT" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
});

export default connect(mapStateToProps)(withRouter(CartDropdown));
