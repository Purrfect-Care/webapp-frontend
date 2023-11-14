import React, { useState, useEffect } from "react";
import DocsCard from "./DocsCard";
import "./DocumentsPage.css";
import { prescriptionsRequest } from "../../../api/prescriptionRequests";

const DocumentsPage = ({ patient }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  

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

  return (
    <div className="documentsPage">
      <div className="cards">
        {prescriptions.map((prescription) => (
            <DocsCard 
            prescId={prescription.id}
            medications={prescription.prescribed_medications}
            date={prescription.prescription_date}
            />
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;
