import React from "react";
import "./PatientRow.css";
import { PatientRowData } from "./PatientRowData";
import { Link } from "react-router-dom";

const PatientRow = ({ name, surname, puppyName }) => {
  return (
    <div className="patientRow">
      <div className="circle"></div>
      <span className="patientText">
      <Link to="#">
          {puppyName} • {name}&nbsp;
          {surname}
      </Link>
      </span>
    </div>
  );
};

export default PatientRow;
