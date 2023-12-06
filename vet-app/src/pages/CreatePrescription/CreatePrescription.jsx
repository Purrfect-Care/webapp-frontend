import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import PrescriptionForm from "../../PrescriptionForm/PrescriptionForm";

const CreatePrescription = () => {

    const handleClosePrescriptionForm = () => {
        window.location.href = '/calendar';
      };
  return (
    <div className="addPage">
      <Sidebar />
      <div className="mainPart">
        <div className="addPageNav">
            <PrescriptionForm 
            onClose={handleClosePrescriptionForm}
            initialPrescriptionValues={{prescriptions_patient_id: null}} />
        </div>
      </div>
    </div>
  );
};

export default CreatePrescription;
