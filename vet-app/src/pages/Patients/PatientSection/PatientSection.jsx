import React from "react";
import "./PatientSection.css";
import NavBar from "../NavBar/NavBar";

const PatientSection = ({ puppyName, age, breed }) => {
  return (
    <div className="patientSection">
      <div className="patientSection-top">
      <div className="mainInfo">
        <div className="rectangle"></div>
        <div className="textInfo">
          <h1 className="puppyName">{puppyName}</h1>
          <span className="ageBreed">{age}<span className="dot">•</span>{breed}</span>
        </div>
      </div>
      <NavBar />
      </div>
    </div>
  );
};

export default PatientSection;
