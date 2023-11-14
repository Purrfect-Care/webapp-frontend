import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientRequest } from "../../../api/patientsRequests.js"; 
import "./OwnerPage.css";
import PatientBar from "../PatientBar/PatientBar";
import PatientRow from "../PatientRow/PatientRow";
import NavBar from "../NavBar/NavBar";
import PatientSection from "../PatientSection/PatientSection";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import PatientsPage from "../PatientsPage";

const OwnerPage = () => {
    const [ownerData, setOwnerData] = useState(null);
    const navigate = useNavigate();
    const { id: patientId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch patient data using the patient ID from the path
            const patientData = await patientRequest(patientId);
    
            // Extract owner id from patient data
            const ownerId = patientData.patients_owner.id;
            //setOwnerId(ownerId);
            const ownerEndpoint = `http://127.0.0.1:8000/api/owners/${ownerId}`;
            const ownerResponse = await fetch(ownerEndpoint);
            if (ownerResponse.ok) {
                const ownerData = await ownerResponse.json();
                setOwnerData(ownerData);
              } else {
                console.error(
                  `Error fetching owner data: ${ownerResponse.status} - ${await ownerResponse.text()}`
                );
                // Redirect or handle the error as needed
                navigate("/error"); // Example: Redirect to an error page
              }
            } catch (error) {
              console.error(`Error fetching patient data: ${error.message}`);
              // Redirect or handle the error as needed
              navigate("/error"); // Example: Redirect to an error page
            }
          };
      
          fetchData();
        }, [patientId, navigate]);
      
        return (
            <>
            <div className="ownerPage">
            {ownerData ? (
          <div className="owner-info">
            <div>
              <span className="owner-label">Imię:</span>
              <span className="owner-value">{ownerData.owner_first_name}</span>
            </div>
            <div>
              <span className="owner-label">Nazwisko:</span>
              <span className="owner-value">{ownerData.owner_last_name}</span>
            </div>
            <div>
              <span className="owner-label">Adres:</span>
              <span className="owner-value">{ownerData.owner_address}</span>
            </div>
            <div>
              <span className="owner-label">Kod pocztowy:</span>
              <span className="owner-value">
                {ownerData.owner_postcode} {ownerData.owner_city}
              </span>
            </div>
            <div>
              <span className="owner-label">Numer telefonu:</span>
              <span className="owner-value">{ownerData.owner_phone_number}</span>
            </div>
            <div>
              <span className="owner-label">Email:</span>
              <span className="owner-value">{ownerData.owner_email}</span>
            </div>
          </div>
        ) : (
          <p>...</p>
        )}
          </div>
          </>          
        );
      };
      
      export default OwnerPage;