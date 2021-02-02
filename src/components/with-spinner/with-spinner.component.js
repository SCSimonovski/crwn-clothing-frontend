import React from "react";
import Spinner from "./spinner.component";

const WithSpinner = (WrappedComponent) => ({ isLoaded, ...otherProps }) => {
  return isLoaded ? <WrappedComponent {...otherProps} /> : <Spinner />;
};

export default WithSpinner;
