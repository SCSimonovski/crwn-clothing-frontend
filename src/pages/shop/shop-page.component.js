import React, { useEffect, lazy, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

import ModalBox from "../../components/modal-box/modal-box.component";
import Snackbar from "../../components/snackbar/snackbar.component";

import "./shop-page.styles.scss";

const CollectionOverview = lazy(() =>
  import("../../components/collection-overview/collection-overview.component")
);
const CollectionPage = lazy(() =>
  import("../collection-page/collection-page.component")
);

const WrappedCollectionOverview = WithSpinner(CollectionOverview);
const WrappedCollectionPage = WithSpinner(CollectionPage);

const ShopPage = ({ dispatch, match, isCollectionsLoaded }) => {
  const isLoggedIn = useSelector((state) => !!state.user.token);
  const addToCartClick = useSelector((state) => state.cart.addToCartClick);

  const [open, setOpenModal] = useState(false);

  const history = useHistory();

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleModalButtonClick = () => {
    setOpenModal(false);
    history.push("/signIn");
  };

  useEffect(() => {
    !isLoggedIn && setOpenModal(true);
  }, [addToCartClick, isLoggedIn]);

  useEffect(() => {
    !isLoggedIn && setOpenModal(false);
  }, [isLoggedIn]);

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

      {!isLoggedIn ? (
        <ModalBox
          text="You must be logged in to buy products"
          open={open}
          closeModal={closeModal}
          handleModalButtonClick={handleModalButtonClick}
          buttonValue={"GO TO SIGN IN PAGE"}
        />
      ) : (
        <Snackbar
          message="The product has been added to your cart"
          openSnackbar={addToCartClick}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isCollectionsLoaded: selectIsCollectionsLoaded(state),
});

export default connect(mapStateToProps)(ShopPage);
