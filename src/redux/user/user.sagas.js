import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { userActionTypes } from "./user.types";
import {
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
} from "./user.actions";

import {
  createUserWithEmailAndPassword,
  signInWithGoogleRequest,
  signInWithEmailAndPassword,
  signOutRequest,
} from "../../api/api.utils";

export function* signIn(userCredentials) {
  const expiration = new Date().getTime() + 1000 * 60 * 60;

  userCredentials.expiration = new Date(expiration).toISOString();

  yield put(signInSuccess(userCredentials));
}

//********* SIGN IN WITH EMAIL AND PASSWORD **************//

export function* signInWithEmail({ payload }) {
  try {
    const auth = yield signInWithEmailAndPassword(payload);
    yield signIn(auth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignInWithEmailStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

////////////////////////////////////////////////////////////

//************** SIGN IN WITH GOOGLE ********************//

export function* signInWithGoogle({ payload }) {
  try {
    const auth = yield signInWithGoogleRequest(payload);
    yield signIn(auth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignInWithGoogleStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

////////////////////////////////////////////////////////////

//************** CHECK USER SESSION ***********************//

export function* isUserAuthenticated() {
  const user = yield select((state) => state.user);
  if (!user.token) {
    return;
  }

  if (new Date(user.expiration).getTime() < new Date().getTime()) {
    yield put(signOutStart());
  }
  return;
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

////////////////////////////////////////////////////////////

//****************** SIGN OUT USER **********************//

export function* signOut() {
  try {
    const token = yield select((state) => state.user.token);
    const id = yield select((state) => state.user.currentUser.id);

    yield signOutRequest(id, token);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

////////////////////////////////////////////////////////////

//*************** SIGN UP USER ***************************//

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const auth = yield createUserWithEmailAndPassword({
      email,
      password,
      name: displayName,
    });
    yield put(signInSuccess(auth));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}
////////////////////////////////////////////////////////////

export function* userSagas() {
  yield all([
    call(onSignInWithGoogleStart),
    call(onSignInWithEmailStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
  ]);
}
