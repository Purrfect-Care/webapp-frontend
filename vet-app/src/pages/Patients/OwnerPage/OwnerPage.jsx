import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientRequest } from "../../../api/patientsRequests.js"; 
import { deleteOwnerById, ownerByIdRequest, editOwnerRequest } from "../../../api/ownerRequests.js";
import "./OwnerPage.css";
import EditOwnerForm from "../../EditOwnerForm/EditOwnerForm.jsx";
import PulseLoader from "react-spinners/PulseLoader";
import ConfirmationPopup from "../../../components/ConifrmationPopup/ConfirmationPopup";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const OwnerPage = ({patient}) => {
    const [ownerData, setOwnerData] = useState(null);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [ownerToDelete, setOwnerToDelete] = useState(null);
    const navigate = useNavigate();
    const { id: patientId } = useParams();
    const [loading, setLoading] = useState(true);

    //const [showEditOwnerForm, setShowEditOwnerForm] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
    
            const ownerId = patient.patients_owner.id;
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
            openSnackbar('success', 'Właściciel usunięty pomyślnie!');

            setTimeout(() => {
              navigate(`/calendar`, { replace: true });
            }, 3000);
          } catch (error) {
            console.error('Error deleting owner:', error);
            openSnackbar('error', 'Błąd podczas usuwania właściciela.');
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
        };

        const submitEditOwnerForm = async (ownerId, ownerData) => {
          try {
            console.log("Owner Data:", ownerData);
            const ownerId = ownerData.id;
            await editOwnerRequest(ownerId, ownerData);
            const updatedOwner = await ownerByIdRequest(ownerId);
            setOwnerData(updatedOwner);
            openSnackbar('success', 'Pomyślnie zmieniono dane właściciela!');
          } catch (error) {
            console.error("Error submitting form:", error);
            openSnackbar('error', 'Błąd podczas edycji danych właściciela.');
          }
          handleCloseEditForm();
        };

        const openSnackbar = (severity, message) => {
          setSnackbarSeverity(severity);
          setSnackbarMessage(message);
          setSnackbarOpen(true);
        };

        console.log("loading: ", loading);
        
        return (
            <>
            <div className="ownerPage">
                <div className="owner-info-page">
                  <div  className="button-container-delete-owner">
                    <button className="deleteOwnerButton" onClick={() => deleteOwner(ownerData.id)}>
                      Usuń właściciela
                    </button>
                  </div>
                  <p>
                    <span className="owner-label">Imię:</span>
                    <span className="owner-value">{ownerData.owner_first_name}</span>
                  </p>
                  <p>
                    <span className="owner-label">Nazwisko:</span>
                    <span className="owner-value">{ownerData.owner_last_name}</span>
                  </p>
                  <p>
                    <span className="owner-label">Adres:</span>
                    <span className="owner-value">{ownerData.owner_address}</span>
                  </p>
                  <p>
                    <span className="owner-label">Kod pocztowy:</span>
                    <span className="owner-value">
                      {ownerData.owner_postcode} {ownerData.owner_city}
                    </span>
                  </p>
                  <p>
                    <span className="owner-label">Numer telefonu:</span>
                    <span className="owner-value">{ownerData.owner_phone_number}</span>
                  </p>
                  <p>
                    <span className="owner-label">Email:</span>
                    <span className="owner-value">{ownerData.owner_email}</span>
                  </p>
                  <div>
                    <button className="edit-owner-button" onClick={handleEditButtonClick}>Zmień dane właściciela</button>
                  </div>

                </div>
                <div className="privacy-policy">
                    Korzystając z PurrfectCare bądź z usług kliniki korzystającej z PurrfectCare zgadzasz się na przetwarzanie danych osobowych zgodnie z <a href="/privacy-policy">Polityką Prywatności</a>. 
                  </div>

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
              onClose={handleCloseEditForm} 
              onSubmit={submitEditOwnerForm}/>
            )} 
            <Snackbar
    open={snackbarOpen}
    anchorOrigin={{ vertical:"top", horizontal:"right" }}
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
      
      export default OwnerPage;