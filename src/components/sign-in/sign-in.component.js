import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import isEmail from "validator/lib/isEmail";

import CustomButton from "../custom-button/custom-button.component";
import InputForm from "../input-form/input-form.component";
import {
  signInWithGoogleStart,
  signInWithEmailStart,
  clearError,
} from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

const SignIn = ({
  signInWithEmailStart,
  signInWithGoogleStart,
  clearError,
  error,
}) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const [errorText, setErrorText] = useState("");

  const handleChange = (e) => {
    setErrorText("");
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  useEffect(() => {
    if (error) {
      setErrorText("Unable to login");
    }
  }, [error, setErrorText]);

  useEffect(() => {
    clearError();

    return () => {
      clearError();
    };
  }, [clearError]);

  const onSignInWithEmail = () => {
    if (email === "" || !isEmail(email)) {
      setErrorText("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorText("Please enter a valid password, at least 8 characters.");
      return;
    }

    signInWithEmailStart(userCredentials);
  };

  const onGoogleResponse = ({ tokenId }) => {
    signInWithGoogleStart(tokenId);
  };

  const onGoogleFailure = (err) => {
    setErrorText("Unable to login with Google");
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <p>Sign in with your email and password</p>

      <form className="sign-in-form">
        <InputForm
          onChange={handleChange}
          value={email}
          name="email"
          type="email"
          label="Email"
          required
        />
        <InputForm
          onChange={handleChange}
          value={password}
          name="password"
          type="password"
          label="Password"
          required
        />

        {errorText ? <span className="error-text">{errorText}</span> : null}

        <div className="buttons">
          <CustomButton
            handleClick={onSignInWithEmail}
            name="signin"
            value="SIGN IN"
          />
          <GoogleLogin
            clientId="626193501027-9htfucued0d70kebq57009h3s01fjio2.apps.googleusercontent.com"
            render={(renderProps) => (
              <CustomButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                classValue="signInWithGoogle"
                value="SIGN IN WITH GOOGLE"
                name="google"
              />
            )}
            buttonText="Login"
            onSuccess={onGoogleResponse}
            onFailure={onGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInWithGoogleStart: (tokenId) => dispatch(signInWithGoogleStart(tokenId)),
  signInWithEmailStart: (userCredentials) =>
    dispatch(signInWithEmailStart(userCredentials)),
  clearError: () => dispatch(clearError()),
});

const mapStateToProps = (state) => ({
  error: state.user.error?.signIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
