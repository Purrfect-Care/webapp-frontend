import React from "react";
import "./NavBar.css";
import { NavBarData } from "./NavBarData";
import { Link } from "react-router-dom";

const NavBar = ({ id, onSelectOption }) => {
  return (
    <div className="navBar">
      {NavBarData.map((item, index) => {
        return (
          <li key={index} className={item.className}>
            <Link to={`/patients/${id}${item.path}`} onClick={() => onSelectOption(item.title)}>
              {item.title}
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default NavBar;
