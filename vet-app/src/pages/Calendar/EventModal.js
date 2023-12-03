import React, { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import VisitForm from '../../pages/VisitForm/VisitForm';
import ViewVisit from '../../pages/VisitForm/ViewVisit';
import { createVisitRequest, updateVisitRequest } from '../../api/visitsRequest';


function EventModal() {
  const { setShowEventModal, selectedEvent, daySelected } = useContext(GlobalContext);
  const [isFormForEdit, setIsFormForEdit] = useState(selectedEvent ? false : true);

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
      if(selectedEvent) await updateVisitRequest(selectedEvent.id, EventData);
      else await createVisitRequest(EventData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    closeForm();
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

  return (
    <div>
    {!isFormForEdit ? (
      <ViewVisit
        onClose={closeForm}
        setEdit={setIsFormForEdit}
        initialValues={selectedEvent ? selectedEvent : newEvent}
      />
    ) : 
    <VisitForm
        onClose={closeForm}
        onSubmit={updateForm}
        setEdit={setIsFormForEdit}
        initialValues={selectedEvent ? selectedEvent : newEvent}
        editOnly={selectedEvent ? false : true}
      />}
    </div>
  );
}

export default EventModal;
