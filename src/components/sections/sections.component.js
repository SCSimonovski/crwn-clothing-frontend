import React from "react";
import { connect } from "react-redux";

import MenuItem from "../menu-item/menu-item.component";

import "./sections.styles.scss";

const Sections = ({ sections }) => {
  return (
    <div className="sections">
      {sections.map((section, index) => {
        return index > 2 ? (
          <MenuItem large="large" key={section.id} {...section} />
        ) : (
          <MenuItem large="" key={section.id} {...section} />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sections: state.shop.sections,
});

export default connect(mapStateToProps)(Sections);
