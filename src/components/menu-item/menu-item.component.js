import React from "react";
import { Link } from "react-router-dom";

import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, large, linkUrl }) => (
  <Link className={`${large} menu-item`} to={linkUrl}>
    <div
      className="background"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>

    <div className={`${large} menu-item__content`}>
      <h2 className="title">{title.toUpperCase()}</h2>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </Link>
);

export default MenuItem;
