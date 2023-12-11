import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientRequest } from "../../../api/patientsRequests.js"; 
import { deleteOwnerById, ownerByIdRequest } from "../../../api/ownerRequests.js";
import "./OwnerPage.css";
import EditOwnerForm from "../../EditOwnerForm/EditOwnerForm.jsx";
import PulseLoader from "react-spinners/PulseLoader";
import ConfirmationPopup from "../../../components/ConifrmationPopup/ConfirmationPopup";


const OwnerPage = () => {
    const [ownerData, setOwnerData] = useState(null);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [ownerToDelete, setOwnerToDelete] = useState(null);
    const navigate = useNavigate();
    const { id: patientId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const patientData = await patientRequest(patientId);
    
            const ownerId = patientData.patients_owner.id;
            const ownerData = await ownerByIdRequest(ownerId);
            setOwnerData(ownerData);
            } catch (error) {
              console.error(`Error fetching patient data: ${error.message}`);
              navigate("/error"); 
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
          }, [patientId, navigate, isEditFormOpen]);

        const handleEditButtonClick = () => {
          setIsEditFormOpen(true);
        };

        const deleteOwner = (ownerId) => {
          setOwnerToDelete(ownerId);
          setShowDeleteConfirmation(true);
        }
      
      
        const confirmDeleteOwner = async () => {
          try {
            const ownerId = ownerToDelete;
            console.log(ownerId);
      
            await deleteOwnerById(ownerId);
            console.log("Owner deleted successfully");
      
            navigate(`/calendar`, { replace: true });
          } catch (error) {
            console.error('Error deleting owner:', error);
          } finally {
            setShowDeleteConfirmation(false)
          }
        };
      
        const cancelDeleteOwner = () => {
          setShowDeleteConfirmation(false);
        };

        if (loading) {
          return (
            <PulseLoader
              color="#4AA587"
              cssOverride={{
                alignItems: "center",
                display: "flex",
                height: "50vh",
                justifyContent: "center",
              }}
              size={20}
              speedMultiplier={0.8}
            />
          );
        }
      
        const handleCloseEditForm = () => {
          setIsEditFormOpen(false);
          fetchData();
        };

        const fetchData = async () => {
          try {
            setLoading(true);
            const patientData = await patientRequest(patientId);
    
            const ownerId = patientData.patients_owner.id;
            const ownerData = await ownerByIdRequest(ownerId);
            setOwnerData(ownerData);
            } catch (error) {
              console.error(`Error fetching patient data: ${error.message}`);
              navigate("/error"); 
            } finally {
              setLoading(false);
            }
          };
        
        return (
            <>
            <div className="ownerPage">

              {ownerData ? (
                <div className="owner-info-page">
                  <div>
                    <button className="deleteOwnerButton" onClick={() => deleteOwner(ownerData.id)}>
                      Usuń właściciela
                    </button>
                  </div>
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
                <p>Ładowanie...</p>
              )}

            {showDeleteConfirmation && (
                    <ConfirmationPopup
                      message="Czy na pewno chcesz usunąć opiekuna, pacjentów z nim związanych i ich dane? (wizyty, choroby, recepty)"
                      onConfirm={confirmDeleteOwner}
                      onCancel={cancelDeleteOwner}
                      onYes="Tak"
                      onNo="Nie"
                    />
            )}
            </div>
            {isEditFormOpen && (<EditOwnerForm
              isOpen={isEditFormOpen}
              ownerId={ownerData?.id}
              existingData={ownerData}
              onClose={handleCloseEditForm} />
            )}          
          </>          
        );
      };
      
      export default OwnerPage;