import React, { useState, useEffect } from 'react';
import { patientRequest, allPatientsRequest } from '../../api/patientsRequests';
import { visitTypeRequest } from '../../api/visitTypeRequest'
import { visitSubtypeRequest } from '../../api/visitSubtypeRequest'
import { employeeRequest } from '../../api/employeesRequest';
import './VisitForm.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';  // Import the utc plugin
import timezone from 'dayjs/plugin/timezone';
import { FaPlus, FaTrash } from 'react-icons/fa';


const VisitForm = ({ onClose, initialValues, setEdit, onSubmit, editOnly = false }) => {
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
    visits_clinic_id: JSON.parse(
      localStorage.getItem("employeeData")
    ).employees_clinic_id
    .toString(),
  });
  const [allTypes, setAllTypes] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [subtypesForSelectedType, setSubtypesForSelectedType] = useState([]);
  const [allSubtypes, setAllSubtypes] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [patientData, setPatient] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [focusedPatient, setFocusedPatient] = useState(false);
  const [focusedDuration, setFocusedDuration] = useState(false);
  const [focusedStatus, setFocusedStatus] = useState(false);
  const [focusedType, setFocusedType] = useState(false);
  const [focusedSubtype, setFocusedSubtype] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [photos, setPhotos] = useState([]);

  const addPhotoField = () => {
    setPhotos((prevPhotos) => [...prevPhotos, { image: null, description: '' }]);
  };

  const removePhotoField = (index) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos.splice(index, 1);
      return updatedPhotos;
    });
  };

  const handlePhotoChange = (index, e) => {
    const file = e.target.files[0];
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[index].image = file;
      return updatedPhotos;
    });
  };

  const handleDescriptionChange = (index, e) => {
    const { name, value } = e.target;
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[index].description = value;
      return updatedPhotos;
    });
  };

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

        if (initialValues.visits_patient_id != null) {
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
    } else if (name === "visit_duration" && value.length <= 6) {
      setFormValues({ ...formValues, [name]: value.replace(/[^0-9]/g, "").replace(/(\d{2})(\d{0,2})/, "$1:$2") });
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
  
    // Check if any required field is empty
    const requiredFields = ['visits_patient_id', 'visits_visit_type_id', 'visits_visit_subtype_id', 'visit_status', 'visit_datetime', 'visit_duration'];
    const isEmptyField = requiredFields.some(field => !formValues[field]);
    const isPhotoEmpty = photos.some(photo => !photo.image);
  
    if (isEmptyField || isPhotoEmpty) {
      // Display an error message or take appropriate action
      setErrorMessage('Wypełnij wszystkie wymagane pola.');
      return;
    }
  
    console.log('Form submitted!');
    try {
        await onSubmit({ ...formValues, photos });
        console.log(formValues);
    } catch (error) {
        // Handle the error returned by the server
        if (error.message === "This vet already has a visit at this time.") {
            setErrorMessage('This vet already has a visit at this time.');
        } else {
            setErrorMessage('An error occurred while creating the visit.');
        }
    }
};

  

  const handleFocusPatient = (e) => {
    setFocusedPatient(true);
  }
  const handleFocusDuration = (e) => {
    setFocusedDuration(true);
  }
  const handleFocusStatus = (e) => {
    setFocusedStatus(true);
  }
  const handleFocusSubtype = (e) => {
    setFocusedSubtype(true);
  }
  const handleFocusType = (e) => {
    setFocusedType(true);
  }


  return (
    <div>
      <div className={`overlay-visit-form ${isFormOpen ? 'active' : ''}`}></div>
      <div className="popup-form-visit">
        <div className="scrollable-area">
        <h2>Formularz wizyty</h2>
        <form onSubmit={handleSubmit} className="form-sections-visit">
          <div className="form-section-visit">
            <h3>Weterynarz</h3>
            <label>
              Imię i nazwisko
              <div className='name-visit'>
                <p className='employee-name'>{`${employee.employee_first_name || ''} ${employee.employee_last_name || ''}`}</p>
              </div>
            </label>
            {/* Add other doctor-related fields here */}
          </div>
          <div className="form-section-visit">
            <h3>Pacjent</h3>
            <label>
              Nazwa pacjenta (wymagane)
              <div className='name-visit'>
                <a href={`http://localhost:3000/patients/${formValues.visits_patient_id}`}>
                  {patientData.patient_name}
                </a>

              </div>
              {!initialValues.visits_patient_id && <select
                className='select-visitform'
                name="visits_patient_id"
                value={formValues.visits_patient_id || ''}
                onChange={handleChange}
                disabled={initialValues.visits_patient_id}
                required="true"
                onBlur={handleFocusPatient}
                focused={focusedPatient.toString()}
              >
                <option value="">Wybierz pacjenta</option>
                {sortedPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.patient_name} • {patient.patients_owner.owner_first_name} {patient.patients_owner.owner_last_name}
                  </option>
                ))}
              </select>}
              <span className='span-visitform'>Należy wybrać pacjenta</span>
            </label>
            <label>
              Waga pacjenta (kg)
              <input
                className='input-visitform'
                type="number"
                step="0.01"
                min="0"
                name="patient_weight"
                value={formValues.patient_weight}
                onChange={handleChange}
              />
            </label>

            <label>
              Wzrost pacjenta (cm)
              <input
                className='input-visitform'
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
                Typ wizyty (wymagane)
                <select
                  className='select-visitform'
                  name="visits_visit_type_id"
                  value={formValues.visits_visit_type_id || ''}
                  onChange={handleChange}
                  required="true"
                  onBlur={handleFocusType}
                  focused={focusedType.toString()}
                >
                  <option value="">-Wybierz typ wizyty-</option>
                  {allTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.visit_type_name}
                    </option>
                  ))}
                </select>
                <span className='span-visitform'>Należy wybrać typ wizyty</span>
              </label>
              <label>
                Podtyp wizyty (wymagane)
                <select
                  className='select-visitform'
                  name="visits_visit_subtype_id"
                  value={formValues.visits_visit_subtype_id || ''}
                  onChange={handleChange}
                  required="true"
                  onBlur={handleFocusSubtype}
                  focused={focusedSubtype.toString()}
                >
                  <option value="">-Wybierz podtyp wizyty-</option>
                  {subtypesForSelectedType.map((subtype) => (
                    <option key={subtype.id} value={subtype.id}>
                      {subtype.visit_subtype_name}
                    </option>
                  ))}
                </select>
                <span className='span-visitform'>Należy wybrać podtyp wizyty</span>
              </label>
              <label>
                Status wizyty (wymagane)
                <select
                  className='select-visitform'
                  name="visit_status"
                  value={formValues.visit_status || ''}
                  onChange={handleChange}
                  required="true"
                  onBlur={handleFocusStatus}
                  focused={focusedStatus.toString()}
                >
                  <option value="">-Wybierz status wizyty-</option>
                  <option value="Zaplanowana">Zaplanowana</option>
                  <option value="Odwołana">Odwołana</option>
                  <option value="Zakończona">Zakończona</option>
                </select>
                <span className='span-visitform'>Należy wybrać status wizyty</span>
              </label>
              <div className="form-section-column-visit">
                <label>
                  Data i godzina wizyty (wymagane)
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        name='visit_datetime'
                        ampm={false}
                        value={dayjs(formValues.visit_datetime)}
                        onChange={handleDateTimeChange}
                        dayOfWeekFormatter={(_day, weekday) => `${weekday.format('dd')}`}
                        sx={{
                          borderRadius: '10px',
                          border: '1px solid #000000',
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </label>
                <label>
                  Czas trwania wizyty (wymagane)
                  <div>
                    <input
                      className='input-visitform-duration'
                      type="text"
                      name="visit_duration"
                      value={formValues.visit_duration}
                      onChange={handleChange}
                      required="true"
                      onBlur={handleFocusDuration}
                      focused={focusedDuration.toString()}
                      pattern='^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
                      maxLength="5"
                    />
                    <span className='span-visitform'>Należy wypełnić czas trwania wizyty (poprawny format to HH:mm)</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="form-section-visit">
              <h3>Opis wizyty</h3>
              <textarea
                name="visit_description"
                value={formValues.visit_description}
                onChange={handleChange}
              />
            </div>
            <div className="form-section-visit">
              <h3>Zdjęcia</h3>
              <div className="form-section-row-visit">
                {photos.map((photo, index) => (
                  <>
                    <div className="form-section-column-visit photo-column">
                      <label>
                        Wybierz zdjęcie (wymagane)
                        <div>
                          <input
                            className="input-visitform-image"
                            type="file"
                            accept="image/*"
                            name={"image"}
                            onChange={(e) => handlePhotoChange(index, e)}
                          />
                          <span className='span-visitform'>Należy wybrać zdjęcie</span>
                        </div>
                      </label>
                      <div>
                        &zwnj; 
                        <div>
                          <button className='delete-photo-row' type="button" onClick={() => removePhotoField(index)}>
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form-section-column-visit">
                      <label>
                        Opis zdjęcia
                        <div>
                        <textarea
                          name={`photo_description`}
                          value={photo.description}
                          onChange={(e) => handleDescriptionChange(index, e)}
                        />
                        </div>
                      </label>
                    </div>                    
                    </>
                ))}
                <button className="add-photo-row" type="button" onClick={addPhotoField}><FaPlus /></button>
            </div>
            </div>
          </div>
        </form>
        </div>
        <div className="button-container-visit">
          {errorMessage &&  <span className='span-visitform-error'>{errorMessage}</span>}
          <button className="form-button-visit" onClick={handleSubmit} type="submit">Zatwierdź</button>
          <button className="form-button-visit" onClick={() => {
            if (editOnly) onClose();
            else setEdit(false);
          }}>Anuluj</button>
        </div>
      </div>
    </div>
  );
};

export default VisitForm;