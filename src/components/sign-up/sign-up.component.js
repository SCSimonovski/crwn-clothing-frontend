import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmail from "validator/lib/isEmail";

import CustomButton from "../custom-button/custom-button.component";
import InputForm from "../input-form/input-form.component";
import { signUpStart, clearError } from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

const SignUp = ({ signUpStart, clearError, error }) => {
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, displayName, password, confirmPassword } = userCredentials;
  const [errorText, setErrorText] = useState("");

  const handleChange = (e) => {
    setErrorText("");
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (displayName === "") {
      setErrorText("Please enter a name");
      return;
    }

    if (email === "" || !isEmail(email)) {
      setErrorText("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorText("Please enter a valid password, at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorText("Passwords don't match");
      return;
    }
    signUpStart({ email, password, displayName });
  };

  useEffect(() => {
    if (error) {
      setErrorText("Unable to create an account");
    }
  }, [error, setErrorText]);

  useEffect(() => {
    clearError();

    return () => {
      clearError();
    };
  }, [clearError]);

  return (
    <div className="sign-up">
      <h2>I do not have an account</h2>
      <p>Sign up with your email and password</p>

      <form className="sign-in-form">
        <InputForm
          onChange={handleChange}
          name="displayName"
          value={displayName}
          type="text"
          label="Display Name"
          required
        />
        <InputForm
          onChange={handleChange}
          name="email"
          value={email}
          type="email"
          label="Email"
          required
        />
        <InputForm
          onChange={handleChange}
          name="password"
          value={password}
          type="password"
          label="Password"
          required
        />
        <InputForm
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          label="Confirm Password"
          required
        />

        {errorText ? <span className="error-text">{errorText}</span> : null}

        <div className="buttons">
          <CustomButton handleClick={handleClick} value="SIGN UP" />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
  clearError: () => dispatch(clearError()),
});

const mapStateToProps = (state) => ({
  error: state.user.error?.signUp,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
