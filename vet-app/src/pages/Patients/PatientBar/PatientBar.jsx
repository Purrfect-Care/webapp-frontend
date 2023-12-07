import React, { useState, useEffect } from "react";
import "./PatientBar.css";
import PatientRow from "../PatientRow/PatientRow";
import { patientsSideBarRequest } from "../../../api/patientsRequests";
import SearchBar from "../SearchBar/SearchBar";
import * as FiIcons from "react-icons/fi";

const PatientBar = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchBar, setSearchBar] = useState(false);
  const [input, setInput] = useState("");

  const showSearchResults = () => setSearchBar(true);

  const hideSearchBar = () => {
    setSearchBar(false);
    setInput("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await patientsSideBarRequest();
        const sortedPatients = patientsData.slice().sort((a, b) => {
          const nameA = a.patient_name.toLowerCase();
          const nameB = b.patient_name.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setPatients(sortedPatients);
        setFilteredPatients(sortedPatients);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) =>
        patient.patient_name.toLowerCase().includes(input.toLowerCase()) ||
        patient.patients_owner.owner_first_name.toLowerCase().includes(input.toLowerCase()) ||
        patient.patients_owner.owner_last_name.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input, patients]);

  return (
    <div className="patientBar">
      <div className="searchBar">
        <div className="topSearchBar">
          {searchBar && (
            <FiIcons.FiArrowLeft className="backIcon" onClick={hideSearchBar} />
          )}
          <SearchBar
            setInput={setInput}
            input={input}
            showSearchResults={showSearchResults}
          />
        </div>
      </div>

      <div className="patients">
        {!searchBar &&
          patients.map((patient) => (
            <PatientRow
              key={patient.id}
              patientId={patient.id}
              ownerName={patient.patients_owner.owner_first_name}
              ownerSurname={patient.patients_owner.owner_last_name}
              patientName={patient.patient_name}
              patientPhoto={patient.patient_photo} // Ensure the property name is correct
            />
          ))}
        {searchBar &&
          filteredPatients.map((patient) => (
            <PatientRow
              key={patient.id}
              patientId={patient.id}
              ownerName={patient.patients_owner.owner_first_name}
              ownerSurname={patient.patients_owner.owner_last_name}
              patientName={patient.patient_name}
              patientPhoto={patient.patient_photo} // Pass the patient's photo URL
            />
          ))}
      </div>
    </div>
  );
};

export default PatientBar;
