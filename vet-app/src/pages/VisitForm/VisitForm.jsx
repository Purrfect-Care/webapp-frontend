import React, { useState, useEffect } from 'react';
import { allPatientsRequest } from '../../api/patientsRequests';
import { visitTypeRequest } from '../../api/visitTypeRequest'
import { visitSubtypeRequest } from '../../api/visitSubtypeRequest'
import './VisitForm.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const VisitForm = ({ onClose, initialValues, edit, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    visits_patient: {
      patient_name: '',
      patient_gender: null,
      patient_date_of_birth: null,
      patients_owner_id: null,
      patients_species_id: null,
      patients_breed_id: null,
    },
    visits_visit_type: {
      visit_type_name: '',
    },
    visits_visit_subtype: {
      visit_subtype_name: '',
      visit_subtypes_visit_type_id: null,
    },
    visits_employee: {
      employee_role: '',
      employee_first_name: '',
      employee_last_name: '',
      employee_address: '',
      employee_postcode: '',
      employee_city: '',
      employee_phone_number: '',
      employee_email: '',
      employee_password: '',
      employees_clinic_id: null,
    },
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
  });
  const [readOnly, setReadOnly] = useState(!edit);
  const [allTypes, setAllTypes] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [subtypesForSelectedType, setSubtypesForSelectedType] = useState([]);
  const [allSubtypes, setAllSubtypes] = useState([]);

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
    onClose();
    window.location.reload();
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
              type="text"
              name="patient_weight"
              value={formValues.patient_weight}
              onChange={handleChange}
              disabled={!!readOnly}
            />
          </label>
          <label>
            Wzrost pacjenta (cm):
            <input
              type="text"
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
                <option value="planned">Zaplanowana</option>
                <option value="cancelled">Odwołana</option>
                <option value="complete">Zakończona</option>
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
        <button className="form-button" onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};

export default VisitForm;