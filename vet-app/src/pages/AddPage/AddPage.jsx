import React from "react";
import "./AddPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavigationPopup from "../../components/NavigationPopup/NavigationPopup";
import { jwtDecode } from "jwt-decode";

const AddPage = () => {
  const authToken = localStorage.getItem('authToken');
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
              message={"Co zamierzasz dodać?"}
              buttonNames={[
                "Pacjenta",
                "Właściciela",
                "Pracownika",
                "Klinikę",
                "Lek",
                "Chorobę",
                "Typ wizyty",
                "Podtyp wizyty",
                "Gatunek",
                "Rasę",
              ]}
              urls={[
                "/add-patient",
                "/add-owner",
                "/sign-in",
                "/add-clinic",
                "/add-medication",
                "/add-illness",
                "/add-visit-type",
                "/add-visit-subtype",
                "/add-species",
                "/add-breed",
              ]}
            />
          )}
          {isAdministrator && (
            <NavigationPopup
              message={"Co zamierzasz dodać?"}
              buttonNames={["Pacjenta", "Właściciela", "Pracownika"]}
              urls={["/add-patient", "/add-owner", "/sign-in"]}
            />
          )}
          {isVet && (
            <NavigationPopup
              message={"Co zamierzasz dodać?"}
              buttonNames={["Pacjenta", "Właściciela"]}
              urls={["/add-patient", "/add-owner"]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPage;
