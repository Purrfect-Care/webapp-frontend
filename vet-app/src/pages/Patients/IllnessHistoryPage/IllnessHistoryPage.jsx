import React, { useState, useEffect } from "react";
import "./IllnessHistoryPage.css";
import { FaTrash, FaPlus } from "react-icons/fa";
import {
  illnessHistoryByPatientIdRequest,
  deleteIllnessHistoryRequest,
  createIllnessHistoryRequest
} from "../../../api/illnessHistoryRequests.js";
import ConfirmationPopup from "../../../components/ConifrmationPopup/ConfirmationPopup";
import PulseLoader from "react-spinners/PulseLoader";
import IllnessHistoryForm from "../../IllnessHistoryForm/IllnessHistoryForm.jsx";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import dayjs from 'dayjs';
import { IoAddCircle } from "react-icons/io5";



const IllnessHistoryPage = ({ patient }) => {
  const [illnessHistory, setIllnessHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState({ column: "DATA", ascending: true });
  const [showIllnessHistoryForm, setShowIllnessHistoryForm] = useState(false);

 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [illnessHistoryToDelete, setIllnessHistoryToDelete] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
 

  useEffect(() => {
    if (patient) {
      const fetchIllnessHistory = async () => {
        try {
          setLoading(true);
          const data = await illnessHistoryByPatientIdRequest(patient.id);

          setIllnessHistory(data);
        } catch (error) {
          console.error("Error fetching data:", error.message);
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

  const deleteIllnessHistoryItem = (item) => {
    setIllnessHistoryToDelete(item);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteIllnessHistory = async () => {
    try {
      if (!illnessHistoryToDelete || !illnessHistoryToDelete.id) {
        console.error("No selected illness history or history ID");
        return;
      }

      const itemId = illnessHistoryToDelete.id;
      await deleteIllnessHistoryRequest(itemId);
      console.log("Illness history item deleted successfully");
      openSnackbar('success', 'Choroba usunięta pomyślnie!');

      // Update the illness history list after deletion
      setIllnessHistory((prevHistory) =>
        prevHistory.filter(
          (historyItem) => historyItem.id !== illnessHistoryToDelete.id
        )
      );
    } catch (error) {
      console.error("Error deleting illness history item:", error);
      openSnackbar('error', 'Błąd podczas usuwania choroby.');
    } finally {
      // Close the confirmation popup
      setShowDeleteConfirmation(false);
    }
  };

  const cancelDeleteIllnessHistory = () => {
    // Close the confirmation popup
    setShowDeleteConfirmation(false);
  };

  if (loading) {
    return (
      <PulseLoader
        color="#4AA587"
        cssOverride={{
          alignItems: "center",
          display: "flex",
          height: "50vh",
          justifyContent: "center",
        }}
        size={20}
        speedMultiplier={0.8}
      />
    );
  }

  
  const sortedIllnessHistory = [...illnessHistory].sort((a, b) => {
    if (sortBy.column === "DATA") {
      const dateA = new Date(a.illness_onset_date);
      const dateB = new Date(b.illness_onset_date);
      return sortBy.ascending ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const handleIllnessHistoryForm = () => {
    setShowIllnessHistoryForm(true);
  };
  const handleCloseIllnessHistoryForm = () => {
    setShowIllnessHistoryForm(false);
  };
  
  const submitIllnessForm = async (formData) => {
    try {
      console.log("Form Data:", formData);
      
      await createIllnessHistoryRequest(formData);
      const updatedIllnessHistory = await illnessHistoryByPatientIdRequest(patient.id);
      setIllnessHistory(updatedIllnessHistory);
      
      openSnackbar('success', 'Choroba przypisana pomyślnie!');
    } catch (error) {
      console.error("Error submitting form:", error);
      openSnackbar('error', 'Błąd podczas przypisywania choroby.');
    }
    handleCloseIllnessHistoryForm();
  };
  
  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  
  
  if (!sortedIllnessHistory.length) {
    return (
      <>
      <div className="no-data-msg">
        <h1 className="no-documents-msg">
          Brak historii chorób dla tego pacjenta
        </h1>
        <button onClick={handleIllnessHistoryForm} className="create-illness-history-button">
          Dodaj chorobę
        </button>
        {showIllnessHistoryForm && (
        <>
          <IllnessHistoryForm
          isOpen={showIllnessHistoryForm}
          onClose={handleCloseIllnessHistoryForm}
          initialValues={{
            illness_history_patient_id: patient.id,
            illness_onset_date: dayjs().format('YYYY-MM-DD')
          }}
          onSubmit={submitIllnessForm}
        />
        </>
      )}
      </div>
      <Snackbar
      open={snackbarOpen}
      anchorOrigin={{ vertical:"top", horizontal:"right" }}
      autoHideDuration={6000}
      onClose={() => setSnackbarOpen(false)}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
      >
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
    </>
    );
  }
  return (
    <>
        <div className="button-container-illness-history-patient">
    <button onClick={handleIllnessHistoryForm} className="create-illness-history-button">
      Przypisz chorobę
    </button>
    </div>
    <div className="illness-history-table">
      <div className="column-bar-illness-history">
        <span
          className="column-illness_history_name"
          onClick={() => sortColumn("CHOROBA")}
        >
          CHOROBA{" "}
          {sortBy.column === "CHOROBA" && (sortBy.ascending ? "↑" : "↓")}
        </span>
        <span
          className="column-illness_history_date"
          onClick={() => sortColumn("DATA")}
        >
          DATA {sortBy.column === "DATA" && (sortBy.ascending ? "↑" : "↓")}
        </span>
        <span className="column-illness_history_delete">USUŃ</span>
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
              <button
                onClick={() => deleteIllnessHistoryItem(historyItem)}
                className="delete-button"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </div>
      
      {showDeleteConfirmation && (
        <ConfirmationPopup
          message="Czy na pewno chcesz usunąć wpis o chorobie?"
          onConfirm={confirmDeleteIllnessHistory}
          onCancel={cancelDeleteIllnessHistory}
          onYes="Tak"
          onNo="Nie"
        />
      )}
      {showIllnessHistoryForm && (
        <>
          <IllnessHistoryForm
          isOpen={showIllnessHistoryForm}
          onClose={handleCloseIllnessHistoryForm}
          initialValues={{
            illness_history_patient_id: patient.id,
            illness_onset_date: dayjs().format('YYYY-MM-DD')
          }}
          onSubmit={submitIllnessForm}
        />
        </>
      )}
    </div>
    <Snackbar
    open={snackbarOpen}
    anchorOrigin={{ vertical:"top", horizontal:"right" }}
    autoHideDuration={6000}
    onClose={() => setSnackbarOpen(false)}
  >
    <MuiAlert
      elevation={6}
      variant="filled"
      onClose={() => setSnackbarOpen(false)}
      severity={snackbarSeverity}
    >
      {snackbarMessage}
    </MuiAlert>
  </Snackbar>
  </>
  );
};

export default IllnessHistoryPage;
