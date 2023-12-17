import React from "react";
import "../AddPage/AddPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavigationPopup from "../../components/NavigationPopup/NavigationPopup";

const ShowPage = () => {
  return (
    <div className="addPage">
      <Sidebar />
      <div className="mainPart">
        <div className="addPageNav">
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
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
