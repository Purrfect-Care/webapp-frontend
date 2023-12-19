import React, { useState, useEffect } from 'react';
import { patientRequest, updatePatientPhotoRequest, deleteOldPhotoRequest } from '../../api/patientsRequests';
import './UpdatePatientPhoto.css';
import Sidebar from '../Sidebar/Sidebar';

const UpdatePatientPhoto = ({ isOpen, patientId, existingData, onClose, onSubmit}) => {
    const [formValues, setFormValues] = useState({
      patient_name: '',
      patient_gender: null,
      patient_date_of_birth: null,
      patients_owner_id: null,
      patients_species_id: null,
      patients_breed_id: null,
      patient_photo: null,  
      });

  useEffect(() => {
    if (existingData) {
      setFormValues(existingData);
    }
  }, [existingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileName = existingData.patient_photo.substring(existingData.patient_photo.lastIndexOf('/') + 1);
      console.log("file name: ", fileName);
      await deleteOldPhotoRequest(fileName);
      await onSubmit(formValues);
      onClose();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      patient_photo: file,
    });
  };

  return (
    <>
      <div className="popup-form-change-photo">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="form-sections-change-photo"
        >
          <div className="form-section-change-photo">
            <h3 className="text-3xl font-semibold mt-7 mb-7 text-emerald-600 text-center">
              Zmiana zdjęcia pacjenta
            </h3>
            <div className="container-change-photo">
              <input
                className="change-photo"
                type="file"
                accept="image/*"
                name="patient_photo"
                multiple
                onChange={handlePhotoChange}
              />
            </div>
            <div className="button-container-change-photo">
              <button type="submit" className="submit-button-change-photo">
                Zmień zdjęcie
              </button>
              <button
                className="submit-button-change-photo"
                type="button"
                onClick={onClose}
              >
                Anuluj
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePatientPhoto;
