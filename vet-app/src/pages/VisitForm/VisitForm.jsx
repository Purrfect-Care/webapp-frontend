import React, { useState, useEffect } from 'react';
import { allPatientsRequest } from '../../api/patientsRequests';
import { visitTypeRequest } from '../../api/visitTypeRequest'
import { visitSubtypeRequest } from '../../api/visitSubtypeRequest'
import { deleteVisitRequest } from '../../api/visitsRequest';
import './VisitForm.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';  // Import the utc plugin
import timezone from 'dayjs/plugin/timezone';
import ConfirmationPopup from "../../components/ConifrmationPopup/ConfirmationPopup";

const VisitForm = ({ onClose, initialValues, edit, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    visit_datetime: '',
    visit_duration: '',
    visit_status: '',
    visit_description: '',
    patient_weight: '',
    patient_height: '',
    visits_patient_id: '',
    visits_visit_type_id: '',
    visits_visit_subtype_id: '',
    visits_employee_id: '',
  });
  const [readOnly, setReadOnly] = useState(!edit);
  const [allTypes, setAllTypes] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [subtypesForSelectedType, setSubtypesForSelectedType] = useState([]);
  const [allSubtypes, setAllSubtypes] = useState([]);
  const [visitToDelete, setVisitToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editWasPressed, setEditWasPressed] = useState(false);


  dayjs.extend(utc);
  dayjs.extend(timezone);
  // Set the time zone to Warsaw (CET)
  dayjs.tz.setDefault('Europe/Warsaw');
  dayjs.locale('en');
  useEffect(() => {
    setReadOnly(!edit);
  }, [edit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitTypes, visitSubtypes, patients] = await Promise.all([
          visitTypeRequest(),
          visitSubtypeRequest(),
          allPatientsRequest(),
        ]);

        setAllTypes(visitTypes);
        setAllSubtypes(visitSubtypes);
        setAllPatients(patients);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
      const typeId = initialValues.visits_visit_type_id;
      const subtypes = allSubtypes.filter((subtype) => subtype.visit_subtypes_visit_type_id === typeId);
      setSubtypesForSelectedType(subtypes);
    }

  }, [initialValues, allSubtypes]);


  const handleChange = async (e) => {
    if (!readOnly) {
      const { name, value } = e.target;

      if (name === 'visits_visit_type_id') {
        const typeId = parseInt(value);
        const subtypes = allSubtypes.filter(
          (subtype) => subtype.visit_subtypes_visit_type_id === typeId
        );
        setSubtypesForSelectedType(subtypes);

        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          [name]: value,
          visits_visit_subtype_id: '',
        }));
      } else {
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          [name]: value,
        }));
      }
    }
  };
  const handleDateTimeChange = (newValue) => {
    if (!readOnly) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        visit_datetime: newValue ? newValue.toISOString() : null,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    await onSubmit(formValues);
    console.log(formValues);
    onClose();
    // window.location.reload();
  };

  const deleteVisit = (visit) => {
    setVisitToDelete(visit);
    setShowConfirmation(true);
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

  return (
    <div className="popup-form">
      <h2>Formularz wizyty</h2>
      <form onSubmit={handleSubmit} className="form-sections">
        <div className="form-section">
          <h3>Lekarz</h3>
          <label>
            <input
              type="text"
              name="visits_employee_id"
              value={formValues.visits_employee_id}
              onChange={handleChange}
              disabled={readOnly}
            />
          </label>
          {/* Add other doctor-related fields here */}
        </div>
        <div className="form-section">
          <h3>Pacjent</h3>
          <label>
            Nazwa pacjenta:
            <select
              name="visits_patient_id"
              value={formValues.visits_patient_id || ''}
              onChange={handleChange}
              disabled={initialValues}
            >
              <option value="">Select Patient</option>
              {allPatients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.patient_name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Waga pacjenta (kg):
            <input
              type="number"
              step="0.01"
              min="0"
              name="patient_weight"
              value={formValues.patient_weight}
              onChange={handleChange}
              disabled={!!readOnly}
            />
          </label>

          <label>
            Wzrost pacjenta (cm):
            <input
              type="number"
              step="0.01"
              min="0"
              name="patient_height"
              value={formValues.patient_height}
              onChange={handleChange}
              disabled={!!readOnly}
            />
          </label>
          {/* Add other patient-related fields here */}
        </div>
        <div className="form-section">
          <h3>Wizyta</h3>
          <div className="form-section-row">
            <label>
              Typ wizyty:
              <select
                name="visits_visit_type_id"
                value={formValues.visits_visit_type_id || ''}
                onChange={handleChange}
                disabled={!!readOnly}
              >
                <option value="">-Wybierz typ wizyty-</option>
                {allTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.visit_type_name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Podtyp wizyty:
              <select
                name="visits_visit_subtype_id"
                value={formValues.visits_visit_subtype_id || ''}
                onChange={handleChange}
                disabled={!!readOnly}
              >
                <option value="">-Wybierz podtyp wizyty-</option>
                {subtypesForSelectedType.map((subtype) => (
                  <option key={subtype.id} value={subtype.id}>
                    {subtype.visit_subtype_name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Status wizyty:
              <select
                name="visit_status"
                value={formValues.visit_status || ''}
                onChange={handleChange}
                disabled={!!readOnly}
              >
                <option value="">-Wybierz status wizyty-</option>
                <option value="Planned">Zaplanowana</option>
                <option value="Cancelled">Odwołana</option>
                <option value="Complete">Zakończona</option>
              </select>
            </label>
            <label>
              Data i godzina wizyty:
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  name='visit_datetime'
                  ampm={false}
                  value={dayjs(formValues.visit_datetime)}
                  onChange={handleDateTimeChange}
                  disabled={!!readOnly}
                  dayOfWeekFormatter={(_day, weekday) => `${weekday.format('dd')}`}
                />
              </LocalizationProvider>
            </label>
            <label>
              Czas trwania wizyty:
              <input
                type="text"
                name="visit_duration"
                value={formValues.visit_duration}
                onChange={handleChange}
                disabled={!!readOnly}
              />
            </label>
          </div>
          <div className="form-section">
            <h3>Opis wizyty</h3>
            <textarea
              name="visit_description"
              value={formValues.visit_description}
              onChange={handleChange}
              disabled={readOnly}
            />
          </div>
        </div>
      </form>
      <div className="button-container">
        {readOnly || <button className="form-button" onClick={handleSubmit} type="submit">Zatwierdź</button>}
        {!readOnly || <button className="delete-button" onClick={() => deleteVisit(initialValues)}>Usuń</button>}
        {!readOnly || <button className="form-button"onClick={() => {setReadOnly(false); setEditWasPressed(true)}}>Edytuj</button>}
        {editWasPressed ? 
          (<button className="form-button" onClick={() => { setReadOnly(true); setEditWasPressed(false) }}>Anuluj</button>) 
          : (<button className="form-button" onClick={onClose}>Zamknij</button>)
        }
      </div>
      {showConfirmation && (
        <ConfirmationPopup
          message="Czy na pewno chcesz usunąć wizytę?"
          onConfirm={confirmDeleteVisit}
          onCancel={cancelDeleteVisit}
        />
      )}
    </div>
  );
};

export default VisitForm;