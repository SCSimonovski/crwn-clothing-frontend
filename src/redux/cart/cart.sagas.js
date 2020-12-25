import { all, put, takeLatest, call } from "redux-saga/effects";

import { userActionTypes } from "../user/user.types";
import { cartActionTypes } from "../cart/cart.types";

import {
  clearCartItems,
  checkoutSuccess,
  checkoutFailure,
} from "./cart.actions";

import { createCheckout } from "../../api/api.utils";

export function* signOutClearCartItems() {
  yield put(clearCartItems());
}

export function* onSignOutClearCartItems() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, signOutClearCartItems);
}

///////////////////////////////////////////////////////
// CHECKOUT //////////////////////////////////////////

export function* checkoutStart({ payload }) {
  try {
    const { message, error } = yield createCheckout(payload);

    if (error) {
      throw new Error(error);
    }

    yield put(checkoutSuccess(message));
  } catch (error) {
    yield put(checkoutFailure(error.message));
  }
}

export function* onCheckoutStart() {
  yield takeLatest(cartActionTypes.CHECKOUT_START, checkoutStart);
}

export function* cartSagas() {
  yield all([call(onSignOutClearCartItems), call(onCheckoutStart)]);
}
