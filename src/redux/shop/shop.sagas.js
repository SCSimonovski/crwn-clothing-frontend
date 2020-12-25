import { takeLatest, call, put, all } from "redux-saga/effects";
import { fetchCollections, fetchSections } from "../../api/api.utils";

import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
  fetchSectionsSuccess,
  fetchSectionsFailure,
} from "./shop.actions";
import { shopActionTypes } from "./shop.types";

export function* fetchSectionsAsync() {
  try {
    const sections = yield call(fetchSections);
    yield put(fetchSectionsSuccess(sections));
  } catch (error) {
    yield put(fetchSectionsFailure(error));
  }
}

export function* fetchCollectionsAsync() {
  try {
    const collections = yield call(fetchCollections);
    yield put(fetchCollectionsSuccess(collections));
  } catch (error) {
    yield put(fetchCollectionsFailure(error));
  }
}

export function* fetchSectionsStart() {
  yield takeLatest(shopActionTypes.FETCH_SECTIONS_START, fetchSectionsAsync);
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart), call(fetchSectionsStart)]);
}
