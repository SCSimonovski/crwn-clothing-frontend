import { userActionTypes } from "./user.types";

export const signInWithGoogleStart = (tokenId) => ({
  type: userActionTypes.GOOGLE_SIGN_IN_START,
  payload: tokenId,
});

export const signInWithEmailStart = (emailAndPassword) => ({
  type: userActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (userCredentials) => {
  userCredentials.expiration = new Date(
    new Date().getTime() + 1000 * 60 * 60
  ).toISOString();
  return {
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: userCredentials,
  };
};

export const signInFailure = (error) => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

// SIGN OUT ////////////////////////////////////////

export const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

// SIGN UP /////////////////////////////////////////

export const signUpStart = (userCredentials) => ({
  type: userActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpFailure = (error) => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});

export const clearError = () => ({
  type: userActionTypes.CLEAR_ERROR,
});
