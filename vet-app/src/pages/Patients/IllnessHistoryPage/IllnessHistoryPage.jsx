import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./IllnessHistoryPage.css";
import { FaTrash } from 'react-icons/fa';
import { illnessHistoryRequest, createIllnessHistoryRequest, deleteIllnessHistoryRequest } from "../../../api/illnessHistoryRequests.js";
import IllnessHistoryForm from "../../IllnessHistoryForm/IllnessHistoryForm.jsx"
import PulseLoader from "react-spinners/PulseLoader";

const IllnessHistoryPage = ({patient}) => {
  const [illnessHistory, setIllnessHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState({ column: 'DATA', ascending: true });
  const navigate = useNavigate();
  const [showIllnessHistoryForm, setShowIllnessHistoryForm] = useState(false);


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
} , [patient]);

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
    return <PulseLoader
    color="#4AA587"
    cssOverride={{
      'align-items': 'center',
      display: 'flex',
      height: '50vh',
      'justify-content': 'center'
    }}
    size={20}
    speedMultiplier={0.8}
  />;
  }

  if (!illnessHistory.length) {
    return <p className="no-illness-history">Brak chorób dla tego pacjenta.</p>;
  }

  const sortedIllnessHistory = [...illnessHistory].sort((a, b) => {
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

  

  const handleIllnessHistoryForm = () => {
    setShowIllnessHistoryForm(true);
  };

  const handleCloseIllnessHistoryForm = () => {
    setShowIllnessHistoryForm(false);
  };

  const submitForm = async (formData) => {
    try {
      console.log('Form Data:', formData);

      await createIllnessHistoryRequest(formData);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
    handleCloseIllnessHistoryForm();
  };

  return (
    <div>
      <div>
      <button onClick={handleIllnessHistoryForm} className="illness_history_form">Przypisz chorobę</button>
      </div>
      <div className="column-bar-illness-history">
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
      {showIllnessHistoryForm && (
      <IllnessHistoryForm
      isOpen={showIllnessHistoryForm}
              onClose={handleCloseIllnessHistoryForm}
              initialValues={{
                illness_history_patient_id: patient.id,
              }}
              onSubmit={submitForm}
 />
      )}
    </div>

    
  );
};

export default IllnessHistoryPage;
