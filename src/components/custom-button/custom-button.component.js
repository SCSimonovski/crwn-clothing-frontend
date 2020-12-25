import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ value, classValue, handleClick, ...buttonProps }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${classValue} button`}
      {...buttonProps}
    >
      {value}
    </button>
  );
};

export default CustomButton;
