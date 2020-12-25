import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCollections } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
import ModalBox from "../../components/modal-box/modal-box.component";

import "./collection-page.styles.scss";

const CollectionPage = ({ match, collections }) => {
  const params = useParams();
  const collection = collections[params.collection];
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
      <div className="collection-page">
        <h1 className="collection-page__title">
          {collection.title.toUpperCase()}
        </h1>

        <div className="collection-page__items">
          {collection.items.map((item) => {
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

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(CollectionPage);
