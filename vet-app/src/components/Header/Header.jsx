import React from "react";
import "./Header.css";
import * as Fa6Icons from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-main">
      <Link to="/calendar">
        <nav className="header">
        <Fa6Icons.FaShieldDog className="dog" />
        <h1 className="logo-text">PurrfectCare</h1>
        </nav>
      </Link>
    </div>
  );
};

export default Header;
