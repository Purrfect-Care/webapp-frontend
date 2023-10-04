import React from "react";
import dog from "../../data/dog.png";
import "./Header.css";


const Header = () => {
    return (
        <nav className="header">
            <img className="logo-dog" src ={dog} alt="logo-dog"></img>
            <h1 className="logo-text">PurrfectCare</h1>
  
            <h3 className="logged-person">Bob Dylan</h3>
        </nav>

    );
};

export default Header;