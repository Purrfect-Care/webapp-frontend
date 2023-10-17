import React from "react";
import './NavBar.css';
import {NavBarData} from "./NavBarData";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navBar">
            {NavBarData.map((item, index) => {
                return (
                    <li key={index} className={item.className}>
                        <Link to={item.path}>
                            {item.title}
                        </Link>
                    </li>
                );
                })}
        </div>
    );
}

export default NavBar;