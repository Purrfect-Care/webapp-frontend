import React, { useState, useEffect } from "react";
import "./PatientSection.css";
import NavBar from "../NavBar/NavBar";

const PatientSection = ({ patientId }) => {
  const [patient, setPatientData] = useState(null);

  useEffect(() => {
    if (patientId) {
      fetch(`http://localhost:8000/api/patients/${patientId}`)
        .then((response) => response.json())
        .then((data) => setPatientData(data))
        .catch((error) => console.error("Error fetching data: " + error));
    }
  }, [patientId]);

  // Default
  if (!patientId) {
    return <h1>Select a patient</h1>;
  }

  // Temp
  if (!patient) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="patientSection">
      <div className="patientSection-top">
        <div className="mainInfo">
          <div className="rectangle"></div>
          <div className="textInfo">
            <h1 className="patient_name">{patient.patient_name}</h1>
            <span className="ageBreed">
              {patient.patient_date_of_birth}
              <span className="dot">•</span>
              {patient.patients_species_id.species_name}
            </span>
          </div>
        </div>
        <NavBar id={patientId}/>
      </div>
    </div>
  );
};

export default PatientSection;
