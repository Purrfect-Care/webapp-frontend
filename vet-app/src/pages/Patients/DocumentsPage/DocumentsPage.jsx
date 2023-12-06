import React, { useState, useEffect } from "react";
import DocsCard from "./DocsCard";
import ConfirmationPopup from "../../../components/ConifrmationPopup/ConfirmationPopup";
import {prescriptionsByPatientIdRequest, deletePrescriptionRequest} from "../../../api/prescriptionRequests";
import "./DocumentsPage.css";
import PulseLoader from "react-spinners/PulseLoader";

const DocumentsPage = ({ patient }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error("Error deleting prescription: " + error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };
  const handlePrescriptionSubmit = (prescriptionData) => {
    // Handle the submission of prescription data here
    console.log("Prescription data submitted:", prescriptionData);
  };

  return (
    <div className="documentsPage">
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

      {!prescriptions.length && !loading && (
        <div className="no-data-msg">
          <h1 className="no-documents-msg">
            Brak dodanych dokumentów dla tego pacjenta
          </h1>
        </div>
      )}

      {!loading && prescriptions.length > 0 && (
        <div className="cards">
          {prescriptions.map((prescription) => (
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
    </div>
  );
};

export default DocumentsPage;
