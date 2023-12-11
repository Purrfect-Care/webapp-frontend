import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NavigationPopup.css";
import * as AiIcons from "react-icons/ai";

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

  const navigateToSpecies = () => {
    let path = "/add-species";
    navigate(path);
  };

  const navigateToBreed = () => {
    let path = "/add-breed";
    navigate(path);
  };


  const navigateToSignIn = () => {
    let path = "/sign-in";
    navigate(path);
  };

  return (
    <div className="navigationPopup-overlay">
      <div className="popup-content">
        <span className="top-popup">
          <div className="w-8">
            <Link to="/calendar">
              <AiIcons.AiOutlineClose className="text-2xl" />
            </Link>
          </div>
          <p className="navigation-message">Co zamierzasz dodać?</p>
        </span>
        <div className="nav-buttons">
          <div>
            <button onClick={navigateToPatient}>Pacjenta</button>
            <button onClick={navigateToSignIn}>Pracownika</button>
            <button onClick={navigateToIllness}>Chorobę</button>
            <button onClick={navigateToMedication}>Lek</button>
          </div>
          <div>
            <button onClick={navigateToVisitType}>Typ wizyty</button>
            <button onClick={navigateToVisitSubtype}>Podtyp wizyty</button>
            <button onClick={navigateToSpecies}>Gatunek</button>
            <button onClick={navigateToBreed}>Rasę</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
