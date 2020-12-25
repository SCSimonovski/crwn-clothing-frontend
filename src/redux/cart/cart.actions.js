import { cartActionTypes } from "./cart.types";

export const addCartItem = (item) => ({
  type: cartActionTypes.ADD_CART_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearItem = (item) => ({
  type: cartActionTypes.CLEAR_ITEM,
  payload: item,
});

export const toogleHidden = () => ({
  type: cartActionTypes.TOOGLE_HIDDEN,
});

export const clearCartItems = () => ({
  type: cartActionTypes.CLEAR_CART_ITEMS,
});

export const checkoutStart = (items, token) => ({
  type: cartActionTypes.CHECKOUT_START,
  payload: { items, token },
});

export const checkoutSuccess = (message) => ({
  type: cartActionTypes.CHECKOUT_SUCCESS,
  payload: message,
});

export const checkoutFailure = (error) => ({
  type: cartActionTypes.CHECKOUT_FAILURE,
  payload: error,
});

export const clearCheckoutMessage = () => ({
  type: cartActionTypes.CLEAR_CHECKOUT_MESSAGE,
});

export const setLoading = () => ({
  type: cartActionTypes.SET_LOADING,
});
