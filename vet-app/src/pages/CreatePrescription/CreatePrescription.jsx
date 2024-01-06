import React from "react";
import { useState } from "react";
import { addPrescriptionRequest, addPrescribedMedicationRequest } from "../../api/prescriptionRequests";
import Sidebar from "../../components/Sidebar/Sidebar";
import PrescriptionForm from "../../PrescriptionForm/PrescriptionForm";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { jwtDecode } from "jwt-decode";

const CreatePrescription = () => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClosePrescriptionForm = () => {
    window.location.href = '/calendar';
  };

  const handleSubmitPrescriptionForm = async (formValues) => {
    try {
      const { prescription_date, prescriptions_patient_id } = formValues;
      const authToken = localStorage.getItem('authToken');
      const employeeData = jwtDecode(authToken);
      const prescriptions_employee_id = employeeData.id.toString();

      const addedPrescription = await addPrescriptionRequest({
        prescription_date,
        prescriptions_patient_id,
        prescriptions_employee_id,
      });

      const prescribedMedicationsData = formValues.prescribed_medications.map((medication) => ({
        medication_amount: medication.medication_amount,
        prescribed_medications_prescription_id: addedPrescription.id,
        prescribed_medications_medication_id: medication.medication_id,
      }));

      await Promise.all(prescribedMedicationsData.map(addPrescribedMedicationRequest));

      console.log('Prescription and medications added successfully!');
      openSnackbar('success', 'Recepta przypisana pomyślnie!');
      setTimeout(() => {
        handleClosePrescriptionForm();
      }, 6000);
      // Optionally, you can do something after successful submission
    } catch (error) {
      console.error('Error submitting prescription:', error.message);
      openSnackbar('error', 'Błąd podczas przypisywania recepty.');
      // Handle error as needed
    }
  };

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };


  return (
    <>
      <div className="addPage">
        <Sidebar />
        <div className="mainPart">
          <div className="addPageNav">
            <PrescriptionForm
              onClose={handleClosePrescriptionForm}
              initialPrescriptionValues={{ prescriptions_patient_id: null }}
              onSubmit={handleSubmitPrescriptionForm} />
          </div>
        </div>
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

export default CreatePrescription;
