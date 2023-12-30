import React from "react";
import "./Header.css";
import * as Fa6Icons from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {

  const storedEmployeeData = JSON.parse(localStorage.getItem("employeeData"));
  
  return (
    <>
    <div className="header-main">
      <Link to="/calendar">
        <nav className="header">
        <Fa6Icons.FaShieldDog className="dog" />
        <h1 className="logo-text">PurrfectCare</h1>
        </nav>
      </Link>
    </div>
          <div className="name-vet">
          <h3 className="logged-name">
          {storedEmployeeData
            ? "Witaj, " +
              storedEmployeeData.employee_first_name +
              " " +
              storedEmployeeData.employee_last_name + "."
            : ""}
        </h3>
        </div>
      </>
  );
};

export default Header;
