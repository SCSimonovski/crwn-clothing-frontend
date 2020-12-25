import React from "react";

import "./with-spinner.styles.scss";

const WithSpinner = (WrappedComponent) => ({ isLoaded, ...otherProps }) => {
  return isLoaded ? (
    <WrappedComponent {...otherProps} />
  ) : (
    <div className="spinner-overlay">
      <div className="spinner-container" />
    </div>
  );
};

export default WithSpinner;
