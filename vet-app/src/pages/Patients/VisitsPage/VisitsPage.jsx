import React, { useState, useEffect } from 'react';
import { visitsByPatientIdRequest, updateVisitRequest, deleteVisitRequest, createVisitRequest } from '../../../api/visitsRequest';
import './VisitsPage.css';
import VisitForm from '../../../pages/VisitForm/VisitForm';
import ViewVisit from '../../VisitForm/ViewVisit';
import ConfirmationPopup from "../../../components/ConifrmationPopup/ConfirmationPopup";
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';// Import the VisitForm component
import PulseLoader from "react-spinners/PulseLoader";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import dayjs from 'dayjs';


const VisitsPage = ({ patient }) => {
  const [visits, setVisits] = useState([]);
  const [sortBy, setSortBy] = useState({ column: 'DATA', ascending: true });
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormForEdit, setIsFormForEdit] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState(null);
  const [editOnly, setEditOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');



  useEffect(() => {
    if (patient) {
      const fetchVisits = async () => {
        try {
          setLoading(true);
          const data = await visitsByPatientIdRequest(patient.id);
          setVisits(data);
        } catch (error) {
          console.error('Error fetching visits:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchVisits();
    }
  }, [patient]);

  const sortColumn = (column) => {
    if (sortBy.column === column) {
      setSortBy({ column, ascending: !sortBy.ascending });
    } else {
      setSortBy({ column, ascending: true });
    }
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

  const editVisit = (visit) => {
    setSelectedVisit(visit);
    setIsFormForEdit(true);
    setEditOnly(true);
  };

  const openForm = (visit) => {
    setSelectedVisit(visit);
    setIsFormOpen(true);
    setEditOnly(false);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedVisit(null);
    setIsFormForEdit(false);
  };

  const updateForm = async (formData) => {
    try {
      console.log('Form Data:', formData);
      if (!selectedVisit || !selectedVisit.id) {
        console.error('No selected visit or visit ID');
        return;
      }
      const visitId = selectedVisit.id;
      await updateVisitRequest(visitId, formData);
      console.log('Form submitted successfully');

      // Fetch updated data after successful submission
      const updatedData = await visitsByPatientIdRequest(patient.id);
      setVisits(updatedData);

      openSnackbar('success', 'Wizyta zaktualizowana pomyślnie!');
    } catch (error) {
      console.error('Error submitting form:', error);
      openSnackbar('error', 'Błąd podczas aktualizacji wizyty.');
    }
    closeForm();
  };

  const submitForm = async (formData) => {
    try {
      console.log("Form Data:", formData);

      await createVisitRequest(formData);
      const updatedData = await visitsByPatientIdRequest(patient.id);
      setVisits(updatedData);

      openSnackbar('success', 'Wizyta utworzona pomyślnie!');
    } catch (error) {
      console.error("Error submitting form:", error);
      openSnackbar('error', 'Błąd podczas tworzenia wizyty.');
    }

    closeForm();
  };

  const handleCreateVisit = () => {
    setIsFormOpen(true);
    setIsFormForEdit(true);
  };

  const deleteVisit = (visit) => {
    setVisitToDelete(visit);
    setShowConfirmation(true);
  };

  const confirmDeleteVisit = async () => {
    try {
      if (!visitToDelete || !visitToDelete.id) {
        console.error('No selected visit or visit ID');
        return;
      }
      const visitId = visitToDelete.id;
      await deleteVisitRequest(visitId);
      console.log('Visit deleted successfully');
      openSnackbar('success', 'Usuwanie wizyty zakończone sukcesem!');
      console.log("snackbar: ", snackbarMessage, snackbarSeverity)
      setVisits((prevVisits) =>
        prevVisits.filter((visit) => visit.id !== visitToDelete.id)
      );
    } catch (error) {
      console.error('Error deleting visit:', error);
      openSnackbar('error', 'Błąd podczas usuwania wizyty.');
    } finally {
      setShowConfirmation(false);
    }
  };

  const cancelDeleteVisit = () => {
    setShowConfirmation(false);
  };
  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };


  const closeFormForDelete = () => {
    setIsFormOpen(false);
  }
  const sortedVisits = [...visits].sort((a, b) => {
    if (sortBy.column === 'NAZWA') {
      const nameA = a.visits_visit_type.visit_type_name.toLowerCase();
      const nameB = b.visits_visit_type.visit_type_name.toLowerCase();
      return sortBy.ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else if (sortBy.column === 'DATA') {
      const dateA = new Date(a.visit_datetime);
      const dateB = new Date(b.visit_datetime);
      return sortBy.ascending ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });
  
  if (!visits.length) {
    return (
      <>
      <div className="no-data-msg">
        <h1 className="no-documents-msg">
          Brak wcześniejszych wizyt pacjenta
        </h1>
        <button onClick={handleCreateVisit} className="create-visit-button">
          Dodaj wizytę
        </button>
        {isFormForEdit && isFormOpen && (
        <VisitForm
          onClose={closeForm}
          onSubmit={submitForm}
          initialValues={{
            visits_patient_id: patient.id,
            visit_datetime: dayjs(),
            visits_employee_id: JSON.parse(
              localStorage.getItem("employeeData")
            ).id.toString(),
          }}
          setEdit={setIsFormForEdit}
          editOnly={editOnly}
        />
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

  const handleEdit = () => {
    setIsFormForEdit(true);
    setIsFormOpen(false);
  }
  return (
    <>
      <div className='visits-table'>
        <div className="column-bar">
          <span className="column-visit_name" onClick={() => sortColumn('NAZWA')}>
            NAZWA {sortBy.column === 'NAZWA' && (sortBy.ascending ? '↑' : '↓')}
          </span>
          <span className="column-visit_date" onClick={() => sortColumn('DATA')}>
            DATA {sortBy.column === 'DATA' && (sortBy.ascending ? '↑' : '↓')}
          </span>
          <span className="column-visit_edit">
            EDYTUJ
          </span>
          <span className="column-visit_delete">
            USUŃ
          </span>
          <button onClick={handleCreateVisit} className="column-visit_add">
            <FaPlus />
          </button>
        </div>
        <div className="visit-list">
          {sortedVisits.map((visit) => (
            <div key={visit.id} className="visit-item">
              <div className="visit-name">
                {/* Adjust the link as needed */}
                <a href='#' onClick={() => openForm(visit)}>
                  {visit.visits_visit_type.visit_type_name} - {visit.visits_visit_subtype.visit_subtype_name}
                </a>
              </div>
              <div className="visit-date">
                {new Date(visit.visit_datetime).toLocaleDateString('en-GB')}
              </div>
              <div className="visit-edit">
                <button onClick={() => editVisit(visit)}>
                  <FaPen />
                </button>
              </div>
              <div className="visit-delete">
                <button onClick={() => deleteVisit(visit)} className="delete-button">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        {isFormOpen && selectedVisit && (
          <ViewVisit
            onClose={closeForm}
            setEdit={handleEdit}
            initialValues={selectedVisit}
            setVisit={setVisitToDelete}
            setConfirmation={setShowConfirmation}
            setFormVisible={closeFormForDelete}
          />
        )}
        {isFormForEdit && selectedVisit && (
          <VisitForm
            onClose={closeForm}
            onSubmit={updateForm}
            initialValues={selectedVisit}
            setEdit={setIsFormForEdit}
            editOnly={editOnly}
          />
        )}

        {isFormForEdit && isFormOpen && (
          <VisitForm
            onClose={closeForm}
            onSubmit={submitForm}
            initialValues={{
              visits_patient_id: patient.id,
              visit_datetime: dayjs(),
              visits_employee_id: JSON.parse(
                localStorage.getItem("employeeData")
              ).id.toString(),
            }}
            setEdit={setIsFormForEdit}
            editOnly={editOnly}
          />
        )}
        {showConfirmation && (
          <ConfirmationPopup
            message="Czy na pewno chcesz usunąć wizytę?"
            onConfirm={confirmDeleteVisit}
            onCancel={cancelDeleteVisit}
            onYes="Tak"
            onNo="Nie"
          />
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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

export default VisitsPage;
