import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection-page/collection-page.component";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

import "./shop-page.styles.scss";

const WrappedCollectionOverview = WithSpinner(CollectionOverview);
const WrappedCollectionPage = WithSpinner(CollectionPage);

const ShopPage = ({ dispatch, match, isCollectionsLoaded }) => {
  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={match.path}
        render={() => (
          <WrappedCollectionOverview isLoaded={isCollectionsLoaded} />
        )}
      />
      <Route
        exact
        path={`${match.path}/:collection`}
        render={() => <WrappedCollectionPage isLoaded={isCollectionsLoaded} />}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isCollectionsLoaded: selectIsCollectionsLoaded(state),
});

export default connect(mapStateToProps)(ShopPage);
