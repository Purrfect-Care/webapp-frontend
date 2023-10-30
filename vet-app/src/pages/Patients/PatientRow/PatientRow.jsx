import React from "react";
import "./PatientRow.css";
import { Link } from "react-router-dom";

const PatientRow = ({ patientId, ownerName, ownerSurname, patientName }) => {
  return (
    <Link to={`/patients/${patientId}`} className="patientRow">
      <div className="circle"></div>
      <span className="patientText">
        {patientName} • {ownerName}&nbsp;
        {ownerSurname}
      </span>
    </Link>
  );
};

export default PatientRow;
