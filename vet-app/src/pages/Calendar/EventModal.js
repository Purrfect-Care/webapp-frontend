import React, { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import VisitForm from '../../pages/VisitForm/VisitForm';
import ViewVisit from '../../pages/VisitForm/ViewVisit';
import { createVisitRequest, updateVisitRequest, deleteVisitRequest } from '../../api/visitsRequest';
import ConfirmationPopup from "../../components/ConifrmationPopup/ConfirmationPopup";



function EventModal({snackbar}) {
  const { setShowEventModal, selectedEvent, daySelected, updateEvent } = useContext(GlobalContext);
  const [isFormForEdit, setIsFormForEdit] = useState(selectedEvent ? false : true);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [visitToDelete, setVisitToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);


  const closeForm = () => {
    setIsFormVisible(false);
  }

  const closeEventModal = () => {
    setShowEventModal(false);
  }

  const updateForm = async (formData) => {
    try {
      const EventData = {
        visit_datetime: formData.visit_datetime,
        visit_duration: formData.visit_duration,
        visit_status: formData.visit_status,
        visit_description: formData.visit_description,
        patient_weight: formData.patient_weight,
        patient_height: formData.patient_height,
        visits_patient_id: formData.visits_patient_id,
        visits_visit_type_id: formData.visits_visit_type_id,
        visits_visit_subtype_id: formData.visits_visit_subtype_id,
        visits_employee_id: formData.visits_employee_id,
      }
      
      const PhotoData = {

      }

      if (selectedEvent) await updateVisitRequest(selectedEvent.id, EventData);
      else await createVisitRequest(EventData);
      snackbar('success', 'Wizyta przypisana pomyślnie!');
      setIsFormVisible(false);
      updateEvent();
    } catch (error) {
      console.error('Error submitting form:', error);
      snackbar('error', 'Błąd podczas przypisywania wizyty.');
    }
    closeEventModal();
  };

  const newEvent = {
    visit_datetime: daySelected,
    visit_duration: '',
    visit_status: '',
    visit_description: '',
    patient_weight: '',
    patient_height: '',
    visits_patient_id: '',
    visits_visit_type_id: '',
    visits_visit_subtype_id: '',
    visits_employee_id: JSON.parse(localStorage.getItem('employeeData')).id.toString()

  };

  const confirmDeleteVisit = async () => {
    try {
      if (!visitToDelete || !visitToDelete.id) {
        console.error('No selected visit or visit ID');
        return;
      }
      await deleteVisitRequest(visitToDelete.id);
      snackbar('success', 'Usuwanie wizyty zakończone sukcesem!');
      setShowConfirmation(false);
      updateEvent();
    } catch (error) {
      console.error('Error deleting visit:', error);
      snackbar('error', 'Błąd podczas usuwania wizyty.');
    } finally {
      // Close the form
      closeEventModal()
    }
  };
  const cancelDeleteVisit = () => {
    setShowConfirmation(false);
  };

  return (
      <div>
        {isFormVisible ? (
          !isFormForEdit ? (
            <ViewVisit
              onClose={closeEventModal}
              setEdit={setIsFormForEdit}
              initialValues={selectedEvent ? selectedEvent : newEvent}
              setVisit={setVisitToDelete}
              setConfirmation={setShowConfirmation}
              setFormVisible={closeForm}
            />
          ) : (
            <VisitForm
              onClose={closeEventModal}
              onSubmit={updateForm}
              setEdit={setIsFormForEdit}
              initialValues={selectedEvent ? selectedEvent : newEvent}
              editOnly={selectedEvent ? false : true}
            />
          )
        ) : null}
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
  );
}

export default EventModal;
