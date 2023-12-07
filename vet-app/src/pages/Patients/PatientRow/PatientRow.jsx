import React from "react";
import "./PatientRow.css";
import { Link } from "react-router-dom";

const PatientRow = ({ patientId, ownerName, ownerSurname, patientName, patientPhoto }) => {
  
  return (
    <Link to={`/patients/${patientId}/visits`} className="patientRow">
      <div className="circle">
        <img src={patientPhoto} alt={patientName} className="patient-photo-sidebar" />
      </div>
      <span className="patientText">
        <div className="patient-name">{patientName}</div>
        <h3 className="owner-info">{ownerName}&nbsp;{ownerSurname}</h3>
      </span>
    </Link>
  );
};

export default PatientRow;
