import React from "react";
import "../AddPage/AddPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavigationPopup from "../../components/NavigationPopup/NavigationPopup";
import { jwtDecode } from "jwt-decode";

const ShowPage = () => {
  const authToken = localStorage.getItem("authToken");
  const employeeData = jwtDecode(authToken);
  const isAdministrator = employeeData?.employee_role === "Administrator";
  const isSuperAdmin = employeeData?.employee_role === "SuperAdmin";
  const isVet = employeeData?.employee_role === "Weterynarz";

  return (
    <div className="addPage">
      <Sidebar />
      <div className="mainPart">
        <div className="addPageNav">
          {isSuperAdmin && (
            <NavigationPopup
              message={"Co chcesz wyświetlić?"}
              buttonNames={[
                "Pacjentów",
                "Właścicieli",
                "Pracowników",
                "Kliniki",
                "Leki",
                "Choroby",
                "Typy wizyt",
                "Podtypy wizyt",
                "Gatunki",
                "Rasy",
              ]}
              urls={[
                "/show-patient",
                "/show-owner",
                "/show-employee",
                "/show-clinic",
                "/show-medication",
                "/show-illness",
                "/show-visit-type",
                "/show-visit-subtype",
                "/show-species",
                "/show-breed",
              ]}
            />
          )}
          {isAdministrator && (
            <NavigationPopup
              message={"Co chcesz wyświetlić?"}
              buttonNames={["Pacjentów", "Właścicieli", "Pracowników"]}
              urls={["/show-patient", "/show-owner", "/show-employee"]}
            />
          )}
          {isVet && (
            <NavigationPopup
              message={"Co zamierzasz wyświetlić?"}
              buttonNames={["Pacjentów", "Właścicieli"]}
              urls={["/show-patient", "/show-owner"]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
