import React from "react";
import "./Header.css";
import * as Fa6Icons from "react-icons/fa6";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  let authToken = localStorage.getItem("authToken");

  if (!authToken) {
    const mockTokenValue =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1wbG95ZWVfcm9sZSI6IldldGVyeW5hcnoiLCJlbXBsb3llZV9maXJzdF9uYW1lIjoiS29uc3RhbnR5IiwiZW1wbG95ZWVfbGFzdF9uYW1lIjoiTWFydXN6Y3p5ayIsImVtcGxveWVlc19jbGluaWNfaWQiOjIsImV4cCI6MTcwNDU3NzQ1MC40NzI3NzN9.1z6ODJLIpxqaIKFxYR7xFAyQCiuDryrIbzDARQUauCU";
    authToken = mockTokenValue;
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
      </>
    );
  }
  const storedEmployeeData = jwtDecode(authToken);

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
              storedEmployeeData.employee_last_name +
              "."
            : ""}
        </h3>
      </div>
    </>
  );
};

export default Header;
