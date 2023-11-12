import React, { useState, useEffect } from "react";
import "./PatientSection.css";
import NavBar from "../NavBar/NavBar";
import AboutPage from "../AboutPage/AboutPage";
import VisitsPage from "../VisitsPage/VisitsPage";
import DocumentsPage from "../DocumentsPage/DocumentsPage";
import OwnerPage from "../OwnerPage/OwnerPage";

const PatientSection = ({ patientId }) => {
  const [patient, setPatientData] = useState(null);
  const [activeComponent, setActiveComponent] = useState("INFORMACJE");

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

  const handleSelectOption = (selectedComponent) => {
    setActiveComponent(selectedComponent);
  };

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
        <NavBar id={patientId} onSelectOption={handleSelectOption}/>
      </div>
      <div className="patientSection-content">
        {activeComponent === "INFORMACJE" && <AboutPage patient={patient} />}
        {activeComponent === "WIZYTY" && <VisitsPage patient={patient} />}        
        {activeComponent === "DOKUMENTACJA" && <DocumentsPage patient={patient} />}   
        {activeComponent === "WŁAŚCICIEL" && <OwnerPage patient={patient} />}   
      </div>
    </div>
  );
};

export default PatientSection;
