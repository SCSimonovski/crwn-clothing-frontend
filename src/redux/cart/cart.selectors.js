import { createSelector } from "reselect";

const cart = state => state.cart;

export const selectHidden = createSelector(
    [cart],
    cart => cart.hidden
);

export const selectCartItems = createSelector(
    [cart],
    cart => cart.items
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    items => items.reduce((accumulator, items) =>
        accumulator + items.quantity * items.price, 0)
)


