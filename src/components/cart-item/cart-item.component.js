import React from "react";

import "./cart-item.styles.scss";

const CartItem = ({ imageUrl, name, price, quantity }) => {
  return (
    <div className="cart-item">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="cart-item__image"
      />

      <div className="cart-item__item-info">
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
