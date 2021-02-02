import React from "react";
import { Link, withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

import "./collection-preview.styles.scss";

const CollectionPreview = ({ items, title, linkUrl }) => {
  return (
    <>
      <div className="collection-preview">
        <Link className="collection-preview__title-link" to={linkUrl}>
          <h1 className="collection-preview__title">{title.toUpperCase()}</h1>
        </Link>
        <div className="items">
          {items
            .filter((item, index) => index < 4)
            .map((item) => {
              return <CollectionItem key={item.id} item={item} />;
            })}
        </div>
      </div>
    </>
  );
};

export default withRouter(CollectionPreview);
