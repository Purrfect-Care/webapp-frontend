import React, { useState, useEffect } from "react";
import DocsCard from "./DocsCard";
import ConfirmationPopup from "../../../components/ConifrmationPopup/ConfirmationPopup";
import {
  prescriptionsByPatientIdRequest,
  deletePrescriptionRequest,
  addPrescribedMedicationRequest,
  addPrescriptionRequest,
} from "../../../api/prescriptionRequests";
import "./DocumentsPage.css";
import PulseLoader from "react-spinners/PulseLoader";
import PrescriptionForm from "../../../PrescriptionForm/PrescriptionForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoAddCircle } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";

const DocumentsPage = ({ patient }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prescriptionsData = await prescriptionsByPatientIdRequest(
          patient.id
        );
        setPrescriptions(prescriptionsData);
        console.log(prescriptionsData);
      } catch (error) {
        console.error("Error fetching data: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [patient]);

  const handleDeletePrescription = (prescriptionId) => {
    setPrescriptionToDelete(prescriptionId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePrescriptionRequest(prescriptionToDelete);
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.filter(
          (prescription) => prescription.id !== prescriptionToDelete
        )
      );
      openSnackbar("success", "Recepta usunięta pomyślnie!");
    } catch (error) {
      console.error("Error deleting prescription: " + error);
      openSnackbar("error", "Błąd podczas usuwania recepty.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleCreatePrescription = () => {
    setShowPrescriptionForm(true);
  };

  const handleClosePrescriptionForm = () => {
    setShowPrescriptionForm(false);
  };

  const handleSubmitPrescriptionForm = async (formValues) => {
    try {
      console.log("handlesubmith: ", formValues);
      const { prescription_date, prescriptions_patient_id } = formValues;
      const authToken = localStorage.getItem('authToken');
      const employeeData = jwtDecode(authToken);
      const prescriptions_employee_id = employeeData.id.toString();

      const addedPrescription = await addPrescriptionRequest({
        prescription_date,
        prescriptions_patient_id,
        prescriptions_employee_id,
      });

     

      const prescribedMedicationsData = formValues.prescribed_medications.map(
        (medication) => ({
          medication_amount: medication.medication_amount,
          medication_dosage: medication.medication_dosage,
          prescribed_medications_prescription_id: addedPrescription.id,
          prescribed_medications_medication_id: medication.medication_id,
        })
      );

      await Promise.all(
        prescribedMedicationsData.map(addPrescribedMedicationRequest)
      );

      console.log("Prescription and medications added successfully!");
      openSnackbar("success", "Recepta przypisana pomyślnie!");
      const updatedPrescriptions = await prescriptionsByPatientIdRequest(
        patient.id
      );
      setPrescriptions(updatedPrescriptions);
      handleClosePrescriptionForm();
      // Optionally, you can do something after successful submission
    } catch (error) {
      console.error("Error submitting prescription:", error.message);
      openSnackbar("error", "Błąd podczas przypisywania recepty.");
      // Handle error as needed
    }
  };

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const sortedPrescriptions = prescriptions.slice().sort((a, b) => {
    const dateA = new Date(a.prescription_date);
    const dateB = new Date(b.prescription_date);
    return dateB - dateA;
  });

  const authToken = localStorage.getItem('authToken');
  const employeeData = jwtDecode(authToken);
  const isAdministrator = employeeData?.employee_role === "Administrator";

  if (!sortedPrescriptions.length) {
    return (
      <>
        <div className="no-data-msg">
          <h1 className="no-documents-msg">
            Brak dodanych dokumentów dla tego pacjenta
          </h1>
          {!isAdministrator && (<button
            onClick={handleCreatePrescription}
            className="create-visit-button"
          >
            Dodaj receptę
          </button>)}
          {showPrescriptionForm && (
            <>
              <PrescriptionForm
                onClose={handleClosePrescriptionForm}
                initialPrescriptionValues={{
                  prescriptions_patient_id: patient.id,
                }}
                onSubmit={handleSubmitPrescriptionForm}
              />
            </>
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
  }

  return (
    <>
      <div className="documentsPage">
        {!isAdministrator && (<div className="create-presc">
          <button
            onClick={handleCreatePrescription}
            className="create_prescription_button"
          >
            Dodaj nową receptę
          </button>
        </div>)}
        
        {loading && (
          <div className="no-data-msg">
            <PulseLoader
              color="#4AA587"
              cssOverride={{
                alignItems: "center",
                display: "flex",
                height: "87vh",
                width: "100%",
                justifyContent: "center",
              }}
              size={20}
              speedMultiplier={0.8}
            />
          </div>
        )}

        {!sortedPrescriptions.length && !loading && (
          <div className="no-data-msg">
            <h1 className="no-documents-msg">
              Brak dodanych dokumentów dla tego pacjenta
            </h1>
          </div>
        )}

        {!loading && sortedPrescriptions.length > 0 && (
          <div className="cards">
            {sortedPrescriptions.map((prescription) => (
              <DocsCard
                key={prescription.id}
                prescId={prescription.id}
                medications={prescription.prescribed_medications}
                date={prescription.prescription_date}
                employee={prescription.prescriptions_employee_id}
                patient={prescription.prescriptions_patient_id}
                owner={patient.patients_owner.id}
                onDelete={() => handleDeletePrescription(prescription.id)}
              />
            ))}
          </div>
        )}

        {showConfirmation && (
          <ConfirmationPopup
            message="Czy chcesz usunąć tą receptę?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            onYes="Tak"
            onNo="Nie"
          />
        )}
        {showPrescriptionForm && (
          <>
            <PrescriptionForm
              onClose={handleClosePrescriptionForm}
              initialPrescriptionValues={{
                prescriptions_patient_id: patient.id,
              }}
              onSubmit={handleSubmitPrescriptionForm}
            />
          </>
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

export default DocumentsPage;
