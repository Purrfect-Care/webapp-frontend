import React, { useState, useEffect } from "react";
import "./PatientBar.css";
import PatientRow from "../PatientRow/PatientRow";
import { patientsSideBarRequest } from "../../../api/patientsRequests";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultsList from "../SearchBar/SearchResultsList";
import * as FiIcons from "react-icons/fi";

const PatientBar = () => {
  const [patients, setPatients] = useState([]);
  const [results, setResults] = useState([]);
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);

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

  const handleSearchBarClick = () => {
    setIsSearchBarClicked(true);
  };

  const handleBackClick = () => {
    setIsSearchBarClicked(false);
    alert("You clicked the Arrow Left icon!");
  };

  return (
    <div className="patientBar">
      <div
        className={`searchBar ${isSearchBarClicked ? "clicked" : ""}`}
        onClick={handleSearchBarClick}
      >
        <div className="topSearchBar">
        <FiIcons.FiArrowLeft className="backIcon" onClick={handleBackClick}/>
        <SearchBar setResults={setResults} />
        </div>
        {isSearchBarClicked && <SearchResultsList results={results} />}
      </div>
      {!isSearchBarClicked && patients.map((patient) => (
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
