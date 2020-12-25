import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";

import ModalBox from "../modal-box/modal-box.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ items, title, linkUrl }) => {
  const [open, setOpenModal] = useState(false);
  const history = useHistory();

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleModalButtonClick = () => {
    setOpenModal(false);
    history.push("/signIn");
  };
  return (
    <>
      {" "}
      <div className="collection-preview">
        <Link className="collection-preview__title-link" to={linkUrl}>
          <h1 className="collection-preview__title">{title.toUpperCase()}</h1>
        </Link>
        <div className="items">
          {items
            .filter((item, index) => index < 4)
            .map((item) => {
              return (
                <CollectionItem
                  key={item.id}
                  item={item}
                  setOpenModal={setOpenModal}
                />
              );
            })}
        </div>
      </div>
      <ModalBox
        text="You must be logged in to buy products"
        open={open}
        closeModal={closeModal}
        handleModalButtonClick={handleModalButtonClick}
        buttonValue="GO TO SIGN IN PAGE"
      />
    </>
  );
};

export default withRouter(CollectionPreview);
