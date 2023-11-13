import React, { useState } from "react";
import "./SearchBar.css";
import * as FaIcons from "react-icons/fa";

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  let debounceTimer;

  const fetchData = (value) => {
    fetch("http://localhost:8000/api/patients/")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.patient_name &&
            user.patient_name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleDebouncedSearch = (value) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchData(value);
    }, 300); 
  };

  const handleChange = (value) => {
    setInput(value);
    handleDebouncedSearch(value);
  };

  return (
    <div className="inputWrapper">
      <FaIcons.FaSearch className="searchIcon" />
      <input
        className="inputSearch"
        placeholder="Wyszukaj..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
