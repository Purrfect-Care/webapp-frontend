import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientRequest } from "../../../api/patientsRequests.js";
import "./IllnessHistoryPage.css";
import { FaPen, FaTrash } from 'react-icons/fa';// Import the VisitForm component
import { illnessHistoryRequest, createIllnessHistoryRequest, deleteIllnessHistoryRequest } from "../../../api/illnessHistoryRequests.js";


const IllnessHistoryPage = ({patient}) => {
  const [illnessHistory, setIllnessHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState({ column: 'DATA', ascending: true });
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  useEffect(() => {
    if (patient) {
      const fetchIllnessHistory = async () => {
        try {
          setLoading(true);
        const data = await illnessHistoryRequest(patient.id);

        setIllnessHistory(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

  fetchIllnessHistory();
}
}, [patient]);

  const sortColumn = (column) => {
    if (sortBy.column === column) {
      setSortBy({ column, ascending: !sortBy.ascending });
    } else {
      setSortBy({ column, ascending: true });
    }
  };  


  const deleteIllnessHistoryItem = async (item) => {
    try {
      const shouldDelete = window.confirm('Czy na pewno chcesz usunąć wpis o chorobie?');

      if (shouldDelete) {
        const itemId = item.id;
        await deleteIllnessHistoryRequest(itemId);
        console.log('Illness history item deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting illness history item:', error);
    }
    window.location.reload();
  };

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

  const sortedIllnessHistory = [...filteredIllnessHistory].sort((a, b) => {
    if (sortBy.column === 'DATA') {
      const dateA = new Date(a.illness_onset_date);
      const dateB = new Date(b.illness_onset_date);
      return sortBy.ascending ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  if (!sortedIllnessHistory.length) {
    return <p className="no-illness-history">Brak chorób dla tego pacjenta.</p>;
  }

  return (
    <div>
      <div className="column-bar">
        <span className="column-illness_history_name" onClick={() => sortColumn('CHOROBA')}>
          CHOROBA {sortBy.column === 'CHOROBA' && (sortBy.ascending ? '↑' : '↓')}
        </span>
        <span className="column-illness_history_date" onClick={() => sortColumn('DATA')}>
          DATA {sortBy.column === 'DATA' && (sortBy.ascending ? '↑' : '↓')}
        </span>
        <span className="column-illness_history_delete">
          USUŃ
        </span>
      </div>
      <div className="illness_history_list">
        {sortedIllnessHistory.map((historyItem) => (
          <li key={historyItem.id} className="illness-history-item">
            <div className="illness-name">
                {historyItem.illness_history_illness.illness_name}
            </div>
          <div className="illness-history-date">
            {historyItem.illness_onset_date}
          </div>
          <div className="illness-history-delete">
            <button onClick={() => deleteIllnessHistoryItem(historyItem)} className="delete-button">
            <FaTrash />
            </button>
          </div>
        </li>
        ))}
      </div>
    </div>

    // <div className="illnessHistoryPage">
    //   <ul>
    //     {filteredIllnessHistory.map((historyItem) => (
    //       <li key={historyItem.id} className="illness-history-item">
    //       <p className="illness-label">Data:</p>
    //       <p className="illness-value">{historyItem.illness_onset_date}</p>
    //       <p className="illness-label">Choroba:</p>
    //       <p className="illness-value">{historyItem.illness_history_illness.illness_name}</p>
    //     </li>
    //     ))}
    //   </ul>
    // </div>
    
  );
};

export default IllnessHistoryPage;
