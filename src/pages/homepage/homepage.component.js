import React, { useEffect } from "react";
import { connect } from "react-redux";

import Sections from "../../components/sections/sections.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsSectionsLoaded } from "../../redux/shop/shop.selectors";
import { fetchSectionsStart } from "../../redux/shop/shop.actions";

const WrappedSections = WithSpinner(Sections);

const Homepage = ({ dispatch, isSectionsLoaded }) => {
  useEffect(() => {
    dispatch(fetchSectionsStart());
  }, [dispatch]);

  return <WrappedSections isLoaded={isSectionsLoaded} />;
};

const mapStateToProps = (state) => ({
  isSectionsLoaded: selectIsSectionsLoaded(state),
  sections: state.shop.sections,
});

export default connect(mapStateToProps)(Homepage);
