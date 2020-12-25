import { shopActionTypes } from "./shop.types";

const INITIAL_STATE = {
  collections: null,
  sections: null,
  isFetching: false,
  errorMessage: "",
};

export const shopReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case shopActionTypes.FETCH_COLLECTIONS_START:
    case shopActionTypes.FETCH_SECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };

    case shopActionTypes.FETCH_COLLECTIONS_FAILURE:
    case shopActionTypes.FETCH_SECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: actions.payload,
      };

    case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: actions.payload,
        isFetching: false,
      };

    case shopActionTypes.FETCH_SECTIONS_SUCCESS:
      return {
        ...state,
        sections: actions.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};
