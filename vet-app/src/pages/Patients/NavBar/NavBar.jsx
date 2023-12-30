import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { NavBarData } from "./NavBarData";
import { Link } from "react-router-dom";

const NavBar = ({ id, onSelectOption, selectedTab }) => {
    
  return (
    <div className="navBar">      
      {NavBarData.map((item, index) => {
        return (
          <li key={index} className={item.className}>
            <Link
              to={`/patients/${id}${item.path}`}
              onClick={() => {
                onSelectOption(item.title);
                
                
              }}
              className={selectedTab === item.title ? "active" : ""}
            >
              {item.title}
            </Link>
          </li>
          
        );
      })}

    </div>
  );
};

export default NavBar;
