import React, { useState, useEffect } from 'react';
import { patientRequest } from '../../api/patientsRequests';
import { typeIdRequest } from '../../api/visitTypeRequest'
import { subtypeIdRequest } from '../../api/visitSubtypeRequest'
import { employeeRequest } from '../../api/employeesRequest';
import { deleteVisitRequest } from '../../api/visitsRequest';
import { getPhotosByVisitId } from '../../api/photosRequests'
import ConfirmationPopup from "../../components/ConifrmationPopup/ConfirmationPopup";
import './ViewVisit.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const ViewVisit = ({ onClose, initialValues, setEdit, setVisit, setConfirmation, setFormVisible }) => {
  const [formValues, setFormValues] = useState({
    visit_datetime: null,
    visit_duration: null,
    visit_status: null,
    visit_description: '',
    patient_weight: null,
    patient_height: null,
    visits_patient_id: null,
    visits_visit_type_id: null,
    visits_visit_subtype_id: null,
    visits_employee_id: null,
    visits_clinic_id: JSON.parse(
      localStorage.getItem("employeeData")
    ).employees_clinic_id
    .toString(),
  });
  const [type, setType] = useState({});
  const [subtype, setSubtype] = useState({});
  const [employee, setEmployee] = useState({});
  const [patientData, setPatient] = useState({});
  const [visitToDelete, setVisitToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isFormOpen, setIsFormOpen] =useState(true);
  const [visitPhotos, setVisitPhotos] = useState([]);
  const [sortBy, setSortBy] = useState({ column: 'DATA', ascending: true });

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Europe/Warsaw');
  dayjs.locale('en');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitTypes, visitSubtypes, patientJSON, employeeJSON] = await Promise.all([
          typeIdRequest(initialValues.visits_visit_type_id),
          subtypeIdRequest(initialValues.visits_visit_subtype_id),
          patientRequest(initialValues.visits_patient_id),
          employeeRequest(initialValues.visits_employee_id),
        ]);
        setEmployee(employeeJSON);
        setPatient(patientJSON);
        setType(visitTypes);
        setSubtype(visitSubtypes);

        const photos = await getPhotosByVisitId(initialValues.id);
        setVisitPhotos(photos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [initialValues]);

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
    }
  }, [initialValues]);

  const deleteVisit = (visit) => {
    setVisit(visit);
    setConfirmation(true);
    setFormVisible();
  };

  const confirmDeleteVisit = async () => {
    try {
      if (!visitToDelete || !visitToDelete.id) {
        console.error('No selected visit or visit ID');
        return;
      }
      await deleteVisitRequest(visitToDelete.id);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting visit:', error);
    } finally {
      // Close the form
      onClose();
      setShowConfirmation(false);
    }
  };

  const cancelDeleteVisit = () => {
    setShowConfirmation(false);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    onClose();
  };

  const sortColumn = (column) => {
    if (sortBy.column === column) {
      setSortBy({ column, ascending: !sortBy.ascending });
    } else {
      setSortBy({ column, ascending: true });
    }
  };

  return (
    <div>
      <div className={`overlay-visit-view ${isFormOpen ? 'active' : ''}`} ></div>
      <div className="popup-form-static">
        <div className="scrollable-area">
        <h2>Wizyta</h2>
        <form className="form-sections-static">
          <div className="form-section-static">
            <h3>Weterynarz</h3>
            <label>
              Imię i nazwisko:
              <div className='name-static'>
              <p className='employee-name'>{`${employee.employee_first_name || ''} ${employee.employee_last_name || ''}`}</p>
              </div>
            </label>
            {/* Add other doctor-related fields here */}
          </div>
          <div className="form-section-static">
            <h3>Pacjent</h3>
            <label>
              Nazwa pacjenta:
              <div className='name-static'>
                <a href={`http://localhost:3000/patients/${formValues.visits_patient_id}`}>
                  {patientData.patient_name}
                </a>
              </div>
            </label>
            <label>
              Waga pacjenta (kg):
              <div className="value-static">
                <p>{formValues.patient_weight}</p>
              </div>
            </label>
            <label>
              Wzrost pacjenta (cm):
              <div className="value-static">
                <p>{formValues.patient_height}</p>
              </div>

            </label>
            {/* Add other patient-related fields here */}
          </div>
          <div className="form-section-static">
            <h3>Wizyta</h3>
            <div className="form-section-row-static">
              <label>
                Typ wizyty:
                <div className="value-static">
                  <p>{type.visit_type_name}</p>
                </div>
              </label>
              <label>
                Podtyp wizyty:
                <div className="value-static">
                  <p>{subtype.visit_subtype_name}</p>
                </div>
              </label>
              <label>
                Status wizyty:
                <div className="value-static">
                  <p>{formValues.visit_status}</p>
                </div>
              </label>
              <label>
                Data i godzina wizyty:
                <div className="value-static">
                  <p>{dayjs(formValues.visit_datetime).format('YYYY-MM-DD HH:mm')}</p>
                </div>
              </label>
              <label>
                Czas trwania wizyty:
                <div className="value-static">
                  <p>{formValues.visit_duration}</p>
                </div>
              </label>
            </div>
            <div className="form-section-static">
              <h3>Opis wizyty</h3>
              <textarea
                name="visit_description-static"
                value={formValues.visit_description}
                disabled={true}
              />
            </div>
            {visitPhotos.length > 0 && (
            <div className="form-section-static">
              <h3>Zdjęcia</h3>
              <div className='photos-table'>
                <div className="photos-column-bar">
                  <span className="column-file" onClick={() => sortColumn('PLIK')}>
                    NAZWA {sortBy.column === 'PLIK' && (sortBy.ascending ? '↑' : '↓')}
                  </span>
                  <span className="column-description" onClick={() => sortColumn('OPIS')}>
                    OPIS {sortBy.column === 'OPIS' && (sortBy.ascending ? '↑' : '↓')}
                  </span>
                </div>
                <div className="photo-list">
                  {visitPhotos.map((photo) => (
                    <div key={photo.id} className="photo-item">
                      <div className="photo-name">
                        <a href={photo.image} target="_blank" rel="noopener noreferrer">
                        {photo.image.split('/').pop()}
                        </a>
                      </div>
                      
                      <div className="photo-description">
                        {photo.photo_description}
                      </div>
                    </div>))}
                </div>
              </div>                   
            </div>)}
          </div>
          </form>
          </div>
          <div className="button-container-static">
            <button className="delete-button" onClick={() => deleteVisit(initialValues)}>Usuń</button>
            <button className="form-button-static" onClick={setEdit}>Edytuj</button>
            <button className="form-button-static" onClick={onClose}>Zamknij</button>
          </div>        
        {showConfirmation && (
          <ConfirmationPopup
            message="Czy na pewno chcesz usunąć wizytę?"
            onConfirm={confirmDeleteVisit}
            onCancel={cancelDeleteVisit}
            onYes="Tak"
            onNo="Nie"
          />
        )}
      </div>
    </div>
  );
};

export default ViewVisit;