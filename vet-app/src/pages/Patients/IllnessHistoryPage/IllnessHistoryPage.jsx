import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientRequest } from "../../../api/patientsRequests.js";
import "./IllnessHistoryPage.css";

const IllnessHistoryPage = () => {
  const [illnessHistory, setIllnessHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  useEffect(() => {
    const fetchIllnessHistory = async () => {
      try {
        setLoading(true);
        const patientData = await patientRequest(patientId);

        const response = await fetch(`http://localhost:8000/api/illness_history/`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch illness history data: ${await response.text()}`);
        }

        const data = await response.json();
        setIllnessHistory(data);
      } catch (error) {
        console.error('Error fetching illness history:', error.message);
        // Handle the error as needed (e.g., show an error message)
      } finally {
        setLoading(false);
      }
    };

    fetchIllnessHistory();
  }, [patientId]);

  if (loading) {
    return <p className="illnessHistoryPage">Ładowanie...</p>;
  }

  if (!illnessHistory.length) {
    return <p className="no-illness-history">Brak chorób dla tego pacjenta.</p>;
  }

  // Filter the illnessHistory based on the condition
  const filteredIllnessHistory = illnessHistory.filter(
    (historyItem) => historyItem.illness_history_patient_id == patientId
  );

  if (!filteredIllnessHistory.length) {
    return <p className="no-illness-history">Brak chorób dla tego pacjenta.</p>;
  }

  return (
    <div className="illnessHistoryPage">
      <ul>
        {filteredIllnessHistory.map((historyItem) => (
          <li key={historyItem.id} className="illness-history-item">
          <p className="illness-label">Data:</p>
          <p className="illness-value">{historyItem.illness_onset_date}</p>
          <p className="illness-label">Choroba:</p>
          <p className="illness-value">{historyItem.illness_history_illness.illness_name}</p>
        </li>
        ))}
      </ul>
    </div>
    
  );
};

export default IllnessHistoryPage;
