import React, { useState } from "react";
import "./NavigationPopup.css";

const PopupComponent = () => {
  return (
    <div className="navigationPopup-overlay">
      <div className="popup-content">
        <p className="navigation-message">Co zamierzasz dodać?</p>
      
      <div className="nav-buttons">
        <button onClick={() => console.log("Navigate to Button 1")}>
          Pacjenta
        </button>
        <button onClick={() => console.log("Navigate to Button 2")}>
          Chorobę
        </button>
        <button onClick={() => console.log("Navigate to Button 3")}>
          Lek
        </button>
        <button onClick={() => console.log("Navigate to Button 3")}>
          Typ wizty
        </button>
      </div>
      </div>
    </div>
  );
};

export default PopupComponent;
