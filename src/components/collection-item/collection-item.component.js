import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";

import { addCartItem, addToCartClick } from "../../redux/cart/cart.actions";

import "./collection-item.style.scss";

const CollectionItem = ({ item }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.user.token);

  const addItem = () => {
    if (isLoggedIn) {
      dispatch(addCartItem(item));
    }
    dispatch(addToCartClick());
  };

  return (
    <>
      <div className="collection-item">
        <div
          style={{ backgroundImage: `url(${item.imageUrl})` }}
          className="background"
        />

        <div className="collection-item__button">
          <CustomButton
            handleClick={addItem}
            classValue="inverted"
            value="ADD TO CART"
          />
        </div>
        <div className="item-info">
          <span>{item.name}</span>
          <span>${item.price}</span>
        </div>
      </div>
    </>
  );
};

export default CollectionItem;
