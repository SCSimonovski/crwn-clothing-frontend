import { shopActionTypes } from "./shop.types";

export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collections) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collections,
});

export const fetchCollectionsFailure = (message) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: message,
});

export const fetchSectionsStart = () => ({
  type: shopActionTypes.FETCH_SECTIONS_START,
});

export const fetchSectionsSuccess = (sections) => ({
  type: shopActionTypes.FETCH_SECTIONS_SUCCESS,
  payload: sections,
});

export const fetchSectionsFailure = (message) => ({
  type: shopActionTypes.FETCH_SECTIONS_FAILURE,
  payload: message,
});
