import React, { useState, useEffect } from "react";
import "./PatientSection.css";
import NavBar from "../NavBar/NavBar";
import { patientRequest } from "../../../api/patientRequest";

const PatientSection = ({ patientId }) => {
  const [patient, setPatientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (patientId) {
          const patientData = await patientRequest(patientId);
          setPatientData(patientData);
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
        <NavBar id={patientId} />
      </div>
    </div>
  );
};

export default PatientSection;
