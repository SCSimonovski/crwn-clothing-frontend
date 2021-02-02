import React, { useEffect } from "react";
import { connect } from "react-redux";

import Sections from "../../components/sections/sections.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsSectionsLoaded } from "../../redux/shop/shop.selectors";
import { fetchSectionsStart } from "../../redux/shop/shop.actions";
import { signOutStart } from "../../redux/user/user.actions";

const WrappedSections = WithSpinner(Sections);

let logoutTimer;

const Homepage = ({
  dispatch,
  isSectionsLoaded,
  token,
  tokenExpirationDate,
}) => {
  useEffect(() => {
    dispatch(fetchSectionsStart());
  }, [dispatch]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();

      logoutTimer = setTimeout(() => {
        dispatch(signOutStart());
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, dispatch]);

  return <WrappedSections isLoaded={isSectionsLoaded} />;
};

const mapStateToProps = (state) => ({
  isSectionsLoaded: selectIsSectionsLoaded(state),
  sections: state.shop.sections,
  token: state.user.token,
  tokenExpirationDate: state.user.expiration,
});

export default connect(mapStateToProps)(Homepage);
