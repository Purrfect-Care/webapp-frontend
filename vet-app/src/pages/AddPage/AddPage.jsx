import React from "react";
import "./AddPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavigationPopup from "../../components/NavigationPopup/NavigationPopup";

const AddPage = () => {
  return (
    <div className="addPage">
      <Sidebar />
      <div className="mainPart">
        <div className="addPageNav">
          <NavigationPopup
            message={"Co zamierzasz dodać?"}
            buttonNames={[
              "Pacjenta",
              "Właściciela",
              "Pracownika",
              "Lek",
              "Chorobę",
              "Podtyp wizyty",
              "Gatunek",
              "Rasę",
            ]}
            urls={[
              "/add-patient",
              "/add-owner",
              "/sign-in",
              "/add-medication",
              "/add-illness",
              "/add-visit-subtype",
              "/add-species",
              "/add-breed",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPage;
