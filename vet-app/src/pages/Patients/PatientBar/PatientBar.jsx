import React, { useState, useEffect } from "react";
import "./PatientBar.css";
import PatientRow from "../PatientRow/PatientRow";
import { patientsSideBarRequest } from "../../../api/patientsSideBarRequest";

const PatientBar = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await patientsSideBarRequest();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="patientBar">
      {patients.map((patient) => (
        <PatientRow
          patientId={patient.id}
          ownerName={patient.patients_owner.owner_first_name}
          ownerSurname={patient.patients_owner.owner_last_name}
          patientName={patient.patient_name}
        />
      ))}
    </div>
  );
};

export default PatientBar;
