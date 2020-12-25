import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  selectShop,
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  selectCollections,
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : null
);

export const selectIsFetching = createSelector(
  selectShop,
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(selectShop, (shop) => {
  return !!shop.collections;
});

export const selectIsSectionsLoaded = createSelector(selectShop, (shop) => {
  return !!shop.sections;
});

export const selectErrorMessage = createSelector(
  selectShop,
  (shop) => shop.errorMessage
);
