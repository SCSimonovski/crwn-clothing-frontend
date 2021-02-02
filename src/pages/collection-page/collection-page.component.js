import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCollections } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection-page.styles.scss";

const CollectionPage = ({ collections }) => {
  const params = useParams();
  const collection = collections[params.collection];

  return (
    <>
      <div className="collection-page">
        <h1 className="collection-page__title">
          {collection.title.toUpperCase()}
        </h1>

        <div className="collection-page__items">
          {collection.items.map((item) => {
            return <CollectionItem key={item.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(CollectionPage);
