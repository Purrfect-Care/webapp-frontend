import React from "react";
import "./DocsCard.css";
import * as GrIcons from "react-icons/gr";


const DocsCard = ({ prescId, medications, date }) => {
    return (
        <div className="docsCard">
          <h3>Prescription ID: {prescId}</h3>
          <p>Prescription Date: {date}</p>
          <h4>Prescribed Medications:</h4>
          <ul>
            {medications.map((medication) => (
              <li key={medication.id}>
                <p>Medication Amount: {medication.medication_amount}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };

export default DocsCard;