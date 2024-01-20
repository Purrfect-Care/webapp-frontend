import React, { useState, useContext } from "react";
import { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import Header from "../Header/Header";
import * as IoIcons from "react-icons/io";
import GlobalContext from "../../context/GlobalContext";
import { jwtDecode } from "jwt-decode";

const Sidebar = ( ) => {
  const [sidebarTab, setSidebarTab] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const { setLoggingOut, setMonthSelcted } = useContext(GlobalContext);

  const roleToTitles = {
    SuperAdmin: [
      "Kalendarz",
      "Wybierz klinikę",
      "Dodaj",
      "Wyświetl",
      "Pacjenci",
    ],
    Administrator: ["Kalendarz", "Pacjenci", "Dodaj", "Wyświetl"],
    Weterynarz: ["Kalendarz", "Pacjenci", "Recepta", "Dodaj", "Wyświetl"],
  };

  useEffect(() => {
    // Fetch employee data from local storageconst 
    const authToken = localStorage.getItem('authToken');
    const storedEmployeeData = jwtDecode(authToken);
    if (storedEmployeeData) {
      setEmployeeData(storedEmployeeData);
    }
  }, []);

  const showSidebarTab = () => setSidebarTab(!sidebarTab);
  const handleExit = () => {
    localStorage.removeItem("employeeData");
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    setMonthSelcted(true);
    setLoggingOut(true);
   
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
              const shouldRenderItem = roleToTitles[
                employeeData?.employee_role
              ]?.includes(item.title);

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
