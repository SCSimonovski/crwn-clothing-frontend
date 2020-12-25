import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CheckoutForm from "../../components/checkout-form/checkout-form.component";
import Spinner from "../../components/with-spinner/spinner.component";
import { setLoading } from "../../redux/cart/cart.actions";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import "./checkout.styles.scss";

const CheckoutPage = ({ total, items, dispatch }) => {
  const loading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    dispatch(setLoading());
  }, [dispatch]);

  return (
    <>
      {!loading ? (
        <div className="checkout-page">
          <div className="items-container">
            {items.length !== 0 ? (
              <>
                <div className="checkout-header">
                  <div className="header-block">
                    <span>Product</span>
                  </div>
                  <div className="header-block">
                    <span>Description</span>
                  </div>
                  <div className="header-block">
                    <span>Quantity</span>
                  </div>
                  <div className="header-block">
                    <span>Price</span>
                  </div>
                  <div className="header-block">
                    <span>Remove</span>
                  </div>
                </div>

                {items.map((cartItem) => (
                  <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </>
            ) : (
              <span className="empty-cart">Your cart is empty</span>
            )}
          </div>

          <div className="stripe-container">
            <div className="total">Total price: ${total}</div>
            <CheckoutForm total={total} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  items: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
