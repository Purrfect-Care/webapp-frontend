import React, { useState, useEffect } from "react";
import "./PatientSection.css";
import NavBar from "../NavBar/NavBar";
import AboutPage from "../AboutPage/AboutPage";
import VisitsPage from "../VisitsPage/VisitsPage";
import DocumentsPage from "../DocumentsPage/DocumentsPage";
import OwnerPage from "../OwnerPage/OwnerPage";
import IllnessHistoryPage from "../IllnessHistoryPage/IllnessHistoryPage";
import { patientRequest } from "../../../api/patientsRequests";
import PulseLoader from "react-spinners/PulseLoader";

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
    return <h1>Wybierz pacjenta</h1>;
  }

  if (!patient) {
    return <PulseLoader
    color="#4AA587"
    cssOverride={{
      'align-items': 'center',
      display: 'flex',
      height: '87vh',
      width: '100%',
      'justify-content': 'center'
    }}
    size={20}
    speedMultiplier={0.8}
  />;
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
