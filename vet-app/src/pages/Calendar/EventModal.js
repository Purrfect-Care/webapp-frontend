import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import VisitForm from '../../pages/VisitForm/VisitForm';
import { updateVisitRequest } from '../../api/visitsRequest';


function EventModal() {
  const { setShowEventModal, selectedEvent, daySelected } = useContext(GlobalContext);


  const closeForm = () => {
    setShowEventModal(false);    
  };

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
      console.log(EventData);
      await updateVisitRequest(selectedEvent.id, EventData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    closeForm();
  };

  const newEvent = {
    visit_datetime: daySelected,
    visit_duration: null,
    visit_status: null,
    visit_description: null,
    patient_weight: null,
    patient_height: null,
    visits_patient_id: null,
    visits_visit_type_id: null,
    visits_visit_subtype_id: null,
    visits_employee_id: JSON.parse(localStorage.getItem('employeeData')).id.toString(),
  };

  return (
    <div>
      <VisitForm
        onClose={closeForm}
        onSubmit={updateForm}
        initialValues={selectedEvent ? selectedEvent : newEvent}
        edit={!selectedEvent}
      />
    </div>
  );
}

export default EventModal;
