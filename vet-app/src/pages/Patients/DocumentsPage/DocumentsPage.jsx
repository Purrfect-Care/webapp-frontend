import React, { useState, useEffect } from "react";
import DocsCard from "./DocsCard";
import ConfirmationPopup from "../../../components/ConifrmationPopup/ConfirmationPopup";
import {prescriptionsRequest, deletePrescriptionRequest} from "../../../api/prescriptionRequests";

const DocumentsPage = ({ patient }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prescriptionsData = await prescriptionsRequest(patient.id);
        setPrescriptions(prescriptionsData);
      } catch (error) {
        console.error("Error fetching data: " + error);
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

  return (
    <div className="documentsPage">
      <div className="cards">
        {prescriptions.map((prescription) => (
          <DocsCard
            key={prescription.id}
            prescId={prescription.id}
            medications={prescription.prescribed_medications}
            date={prescription.prescription_date}
            onDelete={() => handleDeletePrescription(prescription.id)}
          />
        ))}
      </div>

      {showConfirmation && (
        <ConfirmationPopup
          message="Czy chcesz usunąć tą receptę?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default DocumentsPage;
