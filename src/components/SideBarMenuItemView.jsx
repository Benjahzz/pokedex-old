import React from "react";
import "../scss/layout/SideBarMenuItem.scss";


export const SideBarMenuItemView = ({item, isOpen}) => {
  
  return (
    <div className="sideBarMenu__item">
      <div className="itemContent">
        <div className="sideBarMenu__item__icon">
          <img src={require(`../images/Pokemon${item.icon}.png`)} alt="" />
        </div>
        <div className="sideBarMenu__item__label">{item.tipo}</div>
      </div>

      {!isOpen ? <div className="tooltip"></div> : ""}
    </div>
  );
};
