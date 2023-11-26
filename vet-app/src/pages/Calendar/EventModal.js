import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import VisitForm from '../../pages/VisitForm/VisitForm';
import { updateVisitRequest, deleteVisitRequest } from '../../api/visitsRequest';


const labelsClasses = ["Planned", "Cancelled", "Complete"];

function EventModal() {
  const { setShowEventModal, selectedEvent } = useContext(GlobalContext);
  const [editMode, setEditMode] = useState(false);

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
        edit={false}
      />
    </div>
  );
}

export default EventModal;
