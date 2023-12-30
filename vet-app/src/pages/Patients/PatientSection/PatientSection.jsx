import React, { useState, useEffect, useContext} from "react";
import "./PatientSection.css";
import NavBar from "../NavBar/NavBar";
import VisitsPage from "../VisitsPage/VisitsPage";
import DocumentsPage from "../DocumentsPage/DocumentsPage";
import OwnerPage from "../OwnerPage/OwnerPage";
import IllnessHistoryPage from "../IllnessHistoryPage/IllnessHistoryPage";
import { patientRequest, deletePatientById, updatePatientPhotoRequest } from "../../../api/patientsRequests";
import PulseLoader from "react-spinners/PulseLoader";
import * as Fa6Icons from "react-icons/fa6";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "../../../components/ConifrmationPopup/ConfirmationPopup";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import UpdatePatientPhoto from "../../../components/UpdatePatientPhoto/UpdatePatientPhoto";
import GlobalContext from "../../../context/GlobalContext";

const PatientSection = ({ patientId}) => {
  const [patient, setPatientData] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Add this line
  
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const {setUpdatePatientBar} = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (patientId) {
          const patientData = await patientRequest(patientId);
          setPatientData(patientData);
          setActiveComponent("WIZYTY");
        }
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();

  }, [patientId]);

  const deletePatient = (patientId) => {
    setPatientToDelete(patientId);
    setShowDeleteConfirmation(true);
  }


  const confirmDeletePatient = async () => {
    try {
      const patientId = patientToDelete;

      await deletePatientById(patientId);
      console.log("Patient deleted successfully");
      openSnackbar('success', 'Pacjent usunięty pomyślnie!');

      setTimeout(() => {
        navigate(`/calendar`, { replace: true });
      }, 3000);

    } catch (error) {
      console.error('Error deleting patient:', error);
      openSnackbar('error', 'Błąd podczas usuwania pacjenta.');
    } finally {
      setShowDeleteConfirmation(false)
    }
  };

  const cancelDeletePatient = () => {
    setShowDeleteConfirmation(false);
  };

  if (!patientId) {
    return (
      <div className="no-patient-msg">
        <Fa6Icons.FaShieldDog className="dog-msg"/>
        <h1 className="patient-msg">Wybierz pacjenta z listy</h1>
      </div>
    );
  }

  if (!patient) {
    return (
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
    );
  }

  const handleSelectOption = (selectedComponent) => {
    setActiveComponent(selectedComponent);
  };

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };


  const handlePhotoChange= async () => {
    setIsEditFormOpen(true);
  }

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  const submitChangePhotoForm = async ( formValues ) => {
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key === 'patient_photo' && value === null) {
          return;
        }
        formData.append(key, value);
      });
      await updatePatientPhotoRequest(patientId, formData);
      const updatedPatient = await patientRequest(patientId);
      setPatientData(updatedPatient);
      setUpdatePatientBar(true);
      openSnackbar('success', 'Pomyślnie zmieniono dane właściciela!');
    } catch (error) {
      console.error("Error submitting form:", error);
      openSnackbar('error', 'Błąd podczas edycji danych właściciela.');
    }
    handleCloseEditForm();
  };

  return (
    <div className="patientSection">
      <div className="patientSection-top">
        <div className='infoContainer'>
        <div className="mainInfo">
        <div className="photo-container">
        <img
            src={patient.patient_photo}
            alt={`Photo of ${patient.patient_name}`}
            className="patient-photo-patient-section"
          />
          </div>
          <div className="textInfo">
            <h1 className="patient-name-patient-section">{patient.patient_name}</h1>
            <span className="patient-details-patient-section">
              <p>
                Data urodzenia: {dayjs(patient.patient_date_of_birth).format('DD-MM-YYYY')}
              </p>
              <p>
                {patient.patients_species.species_name}
                <span className="dot">•</span>
                {patient.patients_breed.breed_name}
              </p>
              <p>{patient.patient_gender}</p>
            </span>
          </div>
        </div>
        <div className="patient-section-button-container">
        <button 
        className="changePhotoButton"
          onClick={(handlePhotoChange)}>
            Zmień zdjęcie</button>
          <button 
          className="deletePatientButton"
          onClick={() => deletePatient(patientId)}>
            Usuń pacjenta</button>
          </div> 

        </div>
        <NavBar id={patientId} onSelectOption={handleSelectOption} selectedTab={activeComponent} />
      </div>
      <div className="patientSection-content">
        {activeComponent === "WIZYTY" && <VisitsPage patient={patient} />}
        {activeComponent === "HISTORIA CHORÓB" && (
          <IllnessHistoryPage patient={patient} />
        )}
        {activeComponent === "DOKUMENTACJA" && (
          <DocumentsPage patient={patient} />
        )}
        {activeComponent === "WŁAŚCICIEL" && <OwnerPage patient={patient} />}
        
      </div>

      {showDeleteConfirmation && (
        <ConfirmationPopup
          message="Czy na pewno chcesz usunąć pacjenta i wszystkie dane z nim związane? (wizyty, choroby, recepty)"
          onConfirm={confirmDeletePatient}
          onCancel={cancelDeletePatient}
          onYes="Tak"
          onNo="Nie"
        />
      )}
      {isEditFormOpen && (<UpdatePatientPhoto
      isOpen={isEditFormOpen}
      patientId={patientId}
      existingData={patient}
      onClose={handleCloseEditForm} 
      onSubmit={submitChangePhotoForm}/>
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
    </div>

    
  );
};

export default PatientSection;
