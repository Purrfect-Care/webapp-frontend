import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import VisitForm from '../../pages/VisitForm/VisitForm';
import { updateVisitRequest } from '../../api/visitsRequest';


function EventModal() {
  const { setShowEventModal, selectedEvent } = useContext(GlobalContext);

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

  return (
    <div>
      <VisitForm
        onClose={closeForm}
        onSubmit={updateForm}
        initialValues={selectedEvent}
        edit={!selectedEvent}
      />
    </div>
  );
}

export default EventModal;
