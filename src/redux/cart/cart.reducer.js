import { cartActionTypes } from "./cart.types";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  items: [],
  message: null,
  loading: false,
  addToCartClick: false,
};

export const cartReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case cartActionTypes.ADD_CART_ITEM:
      return {
        ...state,
        items: addItemToCart(state.items, actions.payload),
      };

    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        items: removeItemFromCart(state.items, actions.payload),
      };

    case cartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        items: clearItemFromCart(state.items, actions.payload),
      };

    case cartActionTypes.CLEAR_CART_ITEMS:
      return {
        ...state,
        items: [],
      };

    case cartActionTypes.TOGGLE_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case cartActionTypes.CHECKOUT_START:
      return {
        ...state,
        loading: true,
      };

    case cartActionTypes.SET_LOADING:
      return {
        ...state,
        loading: false,
      };

    case cartActionTypes.CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: actions.payload,
      };

    case cartActionTypes.CHECKOUT_FAILURE:
      return {
        ...state,
        loading: false,
        message: actions.payload,
      };

    case cartActionTypes.CLEAR_CHECKOUT_MESSAGE:
      return {
        ...state,
        message: null,
      };

    case cartActionTypes.ADD_TO_CART_CLICK:
      return {
        ...state,
        addToCartClick: !state.addToCartClick,
      };

    default:
      return state;
  }
};
