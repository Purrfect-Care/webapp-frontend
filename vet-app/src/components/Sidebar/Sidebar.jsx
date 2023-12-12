import React, { useState } from "react";
import { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import Header from "../Header/Header";
import * as IoIcons from "react-icons/io";

const Sidebar = () => {
  const [sidebarTab, setSidebarTab] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    // Fetch employee data from local storage
    const storedEmployeeData = localStorage.getItem("employeeData");
    if (storedEmployeeData) {
      setEmployeeData(JSON.parse(storedEmployeeData));
    }
  }, []);

  const showSidebarTab = () => setSidebarTab(!sidebarTab);
  const handleExit = () => {
    // Clear localStorage data
    localStorage.removeItem("employeeData");
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
  };

  return (
    <>
      <div className="sidebar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebarTab} className="bars" />
        </Link>
        <Header />
      </div>
      <IconContext.Provider value={{ color: "#fff", className: "icons" }}>
        <nav className={sidebarTab ? "side-menu active" : "side-menu"}>
          <ul className="side-menu-items" onClick={showSidebarTab}>
            <li className="sidebar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              // Check if the role is Administrator or if the item is not "Dodaj"
              const shouldRenderItem =
                (employeeData?.employee_role === "Administrator" &&
                  item.title !== "Recepta") ||
                (employeeData?.employee_role !== "Administrator" &&
                  item.title !== "Dodaj");

              return (
                shouldRenderItem && (
                  <li key={index} className={item.className}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="item-title">{item.title}</span>
                    </Link>
                  </li>
                )
              );
            })}
            <Link to="/login" className="exit" onClick={handleExit}>
              <IoIcons.IoMdExit className="exit-icon" />
            </Link>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
