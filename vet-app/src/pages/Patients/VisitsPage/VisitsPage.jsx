import React, { useState, useEffect } from 'react';
import { visitsByPatientIdRequest, updateVisitRequest, deleteVisitRequest } from '../../../api/visitsRequest';
import './VisitsPage.css';
import VisitForm from '../../../pages/VisitForm/VisitForm';
import ConfirmationPopup from "../../../components/ConifrmationPopup/ConfirmationPopup";
import { FaPen, FaTrash } from 'react-icons/fa';// Import the VisitForm component

const VisitsPage = ({ patient }) => {
  const [visits, setVisits] = useState([]);
  const [sortBy, setSortBy] = useState({ column: 'DATA', ascending: true });
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState(null);

  useEffect(() => {
    if (patient) {
      const fetchVisits = async () => {
        try {
          const data = await visitsByPatientIdRequest(patient.id);
          setVisits(data);
        } catch (error) {
          console.error('Error fetching visits:', error);
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

  const editVisit = (visit) => {
    setSelectedVisit(visit);
    setIsFormOpen(true);
    setEditMode(true);
  };

  const openForm = (visit) => {
    setSelectedVisit(visit);
    setIsFormOpen(true);
    setEditMode(false);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedVisit(null);
  };

  const updateForm = async (formData) => {
    try {
      // Log the form data before sending the request
      console.log('Form Data:', formData);
  
      if (!selectedVisit || !selectedVisit.id) {
        console.error('No selected visit or visit ID');
        return;
      }
  
      const visitId = selectedVisit.id;
      await updateVisitRequest(visitId, formData);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  
    // Close the form
    closeForm();
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
      setVisits((prevVisits) =>
        prevVisits.filter((visit) => visit.id !== visitToDelete.id)
      );
    } catch (error) {
      console.error('Error deleting visit:', error);
    } finally {
      // Close the form
      closeForm();
      setShowConfirmation(false);
    }
  };

  const cancelDeleteVisit = () => {
    setShowConfirmation(false);
  };


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

  return (
    <div>
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
        <VisitForm
          onClose={closeForm}
          onSubmit={updateForm}
          initialValues={selectedVisit}
          edit={editMode} // Pass the selected visit details to the form
        />
      )}
      {showConfirmation && (
        <ConfirmationPopup
          message="Czy na pewno chcesz usunąć wizytę?"
          onConfirm={confirmDeleteVisit}
          onCancel={cancelDeleteVisit}
        />
      )}
    </div>
  );
};

export default VisitsPage;
