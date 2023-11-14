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
  const [searchBar, setSearchBar] = useState(false);
  const [input, setInput] = useState("");

  const showSearchResults = () => setSearchBar(true);

  const hideSearchBar = () => {
    setSearchBar(false);
    setResults([])
    setInput("")
  }

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
      <div className="searchBar">
        <div className="topSearchBar">
          {searchBar && (
            <FiIcons.FiArrowLeft className="backIcon" onClick={hideSearchBar} />
          )}
          <SearchBar
            setResults={setResults}
            showSearchResults={showSearchResults}
            setInput={setInput}
            input={input}
          />
        </div>
      </div>
      {searchBar && <SearchResultsList results={results} />}

      <div className="patients">
      {!searchBar &&
        patients.map((patient) => (
          <PatientRow
            patientId={patient.id}
            ownerName={patient.patients_owner.owner_first_name}
            ownerSurname={patient.patients_owner.owner_last_name}
            patientName={patient.patient_name}
          />
        ))}
        </div>
    </div>
  );
};

export default PatientBar;
