import React, { useState, useEffect } from "react";
import "./PatientBar.css";
import PatientRow from "../PatientRow/PatientRow";

const PatientBar = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/patients/")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching data: " + error));
  }, []);

  return (
    <div className="patientBar">
      {patients.map((patient) => (
        <PatientRow
          patientId={patient.id}
          ownerName={patient.patients_owner_id.owner_first_name}
          ownerSurname={patient.patients_owner_id.owner_last_name}
          patientName={patient.patient_name}
        />
      ))}
    </div>
  );
};

export default PatientBar;
