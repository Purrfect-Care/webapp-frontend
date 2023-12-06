import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationPopup.css";

const PopupComponent = () => {
  let navigate = useNavigate();

  const navigateToPatient = () => {
    let path = "/add-patient";
    navigate(path);
  };

  const navigateToIllness = () => {
    let path = "/add-illness";
    navigate(path);
  };

  const navigateToMedication = () => {
    let path = "/add-medication";
    navigate(path);
  };

  const navigateToVisitType = () => {
    let path = "/add-visit-type";
    navigate(path);
  };

  const navigateToVisitSubtype = () => {
    let path = "/add-visit-subtype";
    navigate(path);
  };

  return (
    <div className="navigationPopup-overlay">
      <div className="popup-content">
        <p className="navigation-message">Co zamierzasz dodać?</p>
        <div className="nav-buttons">
          <button onClick={navigateToPatient}>Pacjenta</button>
          <button onClick={navigateToIllness}>Chorobę</button>
          <button onClick={navigateToMedication}>Lek</button>
          <button onClick={navigateToVisitType}>Typ wizyty</button>
          <button onClick={navigateToVisitSubtype}>Podtyp wizyty</button>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
