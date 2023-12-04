import React, { useState, useEffect } from "react";
import "./PatientSection.css";
import NavBar from "../NavBar/NavBar";
import AboutPage from "../AboutPage/AboutPage";
import VisitsPage from "../VisitsPage/VisitsPage";
import DocumentsPage from "../DocumentsPage/DocumentsPage";
import OwnerPage from "../OwnerPage/OwnerPage";
import IllnessHistoryPage from "../IllnessHistoryPage/IllnessHistoryPage";
import { patientRequest } from "../../../api/patientsRequests";

const PatientSection = ({ patientId }) => {
  const [patient, setPatientData] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (patientId) {
          const patientData = await patientRequest(patientId);
          setPatientData(patientData);
          setActiveComponent(null);
        }
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, [patientId]);

  if (!patientId) {
    return <h1>Select a patient</h1>;
  }

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
        <div className="photo-container">
        <img
            src={patient.patient_photo}
            alt={`Photo of ${patient.patient_name}`}
            className="patient-photo"
            style={{ width: '150px', height: '150px' }} // Adjust the width and height as needed
          />
          </div>
          <div className="textInfo">
            <h1 className="patient_name">{patient.patient_name}</h1>
            <span className="ageBreed">
              {patient.patient_date_of_birth}
              <span className="dot">•</span>
              {patient.patients_species.species_name}
            </span>
          </div>
        </div>
        <NavBar id={patientId} onSelectOption={handleSelectOption}/>
      </div>
      <div className="patientSection-content">
        {activeComponent === "INFORMACJE" && <AboutPage patient={patient} />}
        {activeComponent === "WIZYTY" && <VisitsPage patient={patient} />}
        {activeComponent === "HISTORIA CHORÓB" && <IllnessHistoryPage patient={patient} />}
        {activeComponent === "DOKUMENTACJA" && <DocumentsPage patient={patient} />}   
        {activeComponent === "WŁAŚCICIEL" && <OwnerPage patient={patient} />}   
      </div>
    </div>
  );
};

export default PatientSection;
