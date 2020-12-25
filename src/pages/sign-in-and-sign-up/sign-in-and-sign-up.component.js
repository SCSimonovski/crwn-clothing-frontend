import React, { useEffect } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./sign-in-and-sign-up.styles.scss";

const SignInAndSignUp = () => {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUp;
