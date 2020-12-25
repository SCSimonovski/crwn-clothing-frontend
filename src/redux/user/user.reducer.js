import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  token: null,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        token: null,
        expiration: null,
        error: null,
      };

    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: { ...actions.payload.user },
        token: actions.payload.token,
        expiration: actions.payload.expiration,
        error: null,
      };

    case userActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: actions.payload,
      };

    case userActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: {
          signOut: null,
          signUp: null,
          signIn: actions.payload,
        },
      };

    case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: {
          signOut: null,
          signIn: null,
          signUp: actions.payload,
        },
      };

    case userActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
