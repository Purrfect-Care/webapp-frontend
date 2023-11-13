import React from 'react';
import "./SearchResult.css";
import { Link } from "react-router-dom";

const SearchResult = ({ result }) => {
  return (
    <div className='searchResult'>
        <Link to={`/patients/${result.id}`} className="patientRow">
          <div className="circle"></div>
          <span className="patientText">
            {result.patient_name} • {result.patients_owner.owner_first_name}&nbsp;
            {result.patients_owner.owner_last_name}
          </span>
        </Link>
    </div>
  );
}

export default SearchResult;
