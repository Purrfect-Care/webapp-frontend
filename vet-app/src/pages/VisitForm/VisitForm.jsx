import React, { useState, useEffect } from 'react';
import { patientRequest, allPatientsRequest } from '../../api/patientsRequests';
import { visitTypeRequest } from '../../api/visitTypeRequest'
import { visitSubtypeRequest } from '../../api/visitSubtypeRequest'
import { employeeRequest } from '../../api/employeeRequest';
import './VisitForm.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';  // Import the utc plugin
import timezone from 'dayjs/plugin/timezone';


const VisitForm = ({ onClose, initialValues, setEdit, onSubmit, editOnly=false }) => {
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
  const [allTypes, setAllTypes] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [subtypesForSelectedType, setSubtypesForSelectedType] = useState([]);
  const [allSubtypes, setAllSubtypes] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [patientData, setPatient] = useState([]);

  dayjs.extend(utc);
  dayjs.extend(timezone);
  // Set the time zone to Warsaw (CET)
  dayjs.tz.setDefault('Europe/Warsaw');
  dayjs.locale('en');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitTypes, visitSubtypes, patients, employeeJSON] = await Promise.all([
          visitTypeRequest(),
          visitSubtypeRequest(),
          allPatientsRequest(),
          employeeRequest(initialValues.visits_employee_id),
        ]);

        if(initialValues.visits_patient_id != null)
        {
          const patientJSON = await patientRequest(initialValues.visits_patient_id);
          setPatient(patientJSON);
        }
        setEmployee(employeeJSON);
        setAllTypes(visitTypes);
        setAllSubtypes(visitSubtypes);
        setAllPatients(patients);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sortedPatients = allPatients.slice().sort((a, b) => {
    const nameA = a.patient_name.toLowerCase();
    const nameB = b.patient_name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
      const typeId = initialValues.visits_visit_type_id;
      const subtypes = allSubtypes.filter((subtype) => subtype.visit_subtypes_visit_type_id === typeId);
      setSubtypesForSelectedType(subtypes);
    }

  }, [initialValues, allSubtypes]);


  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "visits_visit_type_id") {
      const typeId = parseInt(value);
      const subtypes = allSubtypes.filter(
        (subtype) => subtype.visit_subtypes_visit_type_id === typeId
      );
      setSubtypesForSelectedType(subtypes);

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
        visits_visit_subtype_id: "",
      }));
    } else {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  };
  const handleDateTimeChange = (newValue) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      visit_datetime: newValue ? newValue.toISOString() : null,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    await onSubmit(formValues);
    console.log(formValues);
    onClose();
    window.location.reload();
  };

  return (
    <div className="popup-form-visit">
      <h2>Formularz wizyty</h2>
      <form onSubmit={handleSubmit} className="form-sections-visit">
        <div className="form-section-visit">
          <h3>Weterynarz</h3>
          <label>
            Imię i nazwisko:
            <div className='name-visit'>
            <a href={`http://localhost:3000/employees/${employee.id}`}>
              {`${employee.employee_first_name || ''} ${employee.employee_last_name || ''}`}
            </a>

            </div>
          </label>
          {/* Add other doctor-related fields here */}
        </div>
        <div className="form-section-visit">
          <h3>Pacjent</h3>
          <label>
            Nazwa pacjenta:
            <div className='name-visit'>
            <a href={`http://localhost:3000/patients/${formValues.visits_patient_id}`}>
              {patientData.patient_name}
            </a>

            </div>
            {!initialValues.visits_patient_id && <select
              name="visits_patient_id"
              value={formValues.visits_patient_id || ''}
              onChange={handleChange}
              disabled={initialValues.visits_patient_id}
            >
              <option value="">Select Patient</option>
              {sortedPatients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.patient_name} • {patient.patients_owner.owner_first_name} {patient.patients_owner.owner_last_name}                   
                </option>
              ))}
            </select>}
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
            />
          </label>
          {/* Add other patient-related fields here */}
        </div>
        <div className="form-section-visit">
          <h3>Wizyta</h3>
          <div className="form-section-row-visit">
            <label>
              Typ wizyty:
              <select
                name="visits_visit_type_id"
                value={formValues.visits_visit_type_id || ''}
                onChange={handleChange}
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
              />
            </label>
          </div>
          <div className="form-section-visit">
            <h3>Opis wizyty</h3>
            <textarea
              name="visit_description"
              value={formValues.visit_description}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
       <div className="button-container-visit">
        <button className="form-button" onClick={handleSubmit} type="submit">Zatwierdź</button>
        <button className="form-button" onClick={() => {
          if(editOnly) onClose();
          else setEdit(false);
        }}>Anuluj</button>
      </div>
    </div>
  );
};

export default VisitForm;