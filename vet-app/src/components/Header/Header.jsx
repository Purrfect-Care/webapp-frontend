import React from "react";
import dog from "../../data/dog.png";
import "./Header.css";
import * as Fa6Icons from "react-icons/fa6";


const Header = () => {
    return (
        <nav className="header">
            <Fa6Icons.FaShieldDog className ="dog" />
            <h1 className="logo-text">PurrfectCare</h1>
        </nav>

    );
};

export default Header;