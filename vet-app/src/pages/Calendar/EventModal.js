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
      await updateVisitRequest(selectedEvent.id, formData);
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
    visits_employee_id: null,
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
