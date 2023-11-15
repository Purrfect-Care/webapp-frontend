import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { patientRequest } from "../../../api/patientsRequests.js"; 
import "./OwnerPage.css";
import EditOwnerForm from "../../../components/EditOwnerForm/EditOwnerForm.jsx";


const OwnerPage = () => {
    const [ownerData, setOwnerData] = useState(null);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
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

        const handleEditButtonClick = () => {
          setIsEditFormOpen(true);
        };
      
        const handleCloseEditForm = () => {
          setIsEditFormOpen(false);
        };
      
        
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
                  <div>
                    <button className="edit-owner-button" onClick={handleEditButtonClick}>Zmień dane właściciela</button>
                  </div>
                </div>
                ) : (
                <p>...</p>
              )}
            </div>
            <EditOwnerForm isOpen={isEditFormOpen} ownerId={ownerData?.id} existingData={ownerData} onClose={handleCloseEditForm} />
          </>          
        );
      };
      
      export default OwnerPage;