import React, { useState, useEffect } from 'react';
import { createPatientRequest} from '../../../api/patientsRequests';
import { getClinicsRequest } from '../../../api/clinicRequests';
import { allBreedsRequest } from '../../../api/breedRequests';
import { allSpeciesRequest } from '../../../api/speciesRequests';
import { allOwnersRequest } from '../../../api/ownerRequests';
import './PatientForm.css'; // Create a CSS file for styling if needed
import Sidebar from '../../../components/Sidebar/Sidebar';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const PatientForm = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    patient_name: '',
    patient_gender: null,
    patient_date_of_birth: null,
    patients_owner_id: null,
    patients_species_id: null,
    patients_breed_id: null,
    patients_clinic_id: null,
    patient_photo: null,  // Add this line for the patient photo
  });

  const [owners, setOwners] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]); // New state for filtered breeds
  const [clinics, setClinics] = useState([]);
  const [readOnly, setReadOnly] = useState();
  const navigate = useNavigate();

  const [focusedPatientName, setFocusedPatientName] = useState(false);
  const [focusedGender, setFocusedGender] = useState(false);
  const [focusedSpecies, setFocusedSpecies] = useState(false);
  const [focusedBreed, setFocusedBreed] = useState(false);
  const [focusedOwner, setFocusedOwner] = useState(false);
  const [focusedClinic, setFocusedClinic] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');


  dayjs.extend(utc);
  dayjs.extend(timezone);
  // Set the time zone to Warsaw (CET)
  dayjs.tz.setDefault('Europe/Warsaw');
  dayjs.locale('en');
  useEffect(() => {
    setReadOnly();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [owners, species, breeds, clinics] = await Promise.all([
          allOwnersRequest(),
          allSpeciesRequest(),
          allBreedsRequest(),
          getClinicsRequest()
        ])

        setOwners(owners);
        setSpecies(species);
        setBreeds(breeds);
        setFilteredBreeds(breeds);
        setClinics(clinics);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "patients_species_id") {
      const selectedSpeciesId = parseInt(value);
      const breedsForSpecies = breeds.filter(breed => breed.breeds_species_id === selectedSpeciesId);
      setFilteredBreeds(breedsForSpecies);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
        patients_breed_id: "", // Reset breed selection when species changes
      }));
    } else {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  };
  const handleDateChange = (newValue) => {
    if (!readOnly) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        patient_date_of_birth: newValue ? newValue.format('YYYY-MM-DD') : null,
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      patient_photo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['patient_name', 'patient_gender', 'patients_owner_id', 'patients_species_id', 'patients_breed_id', 'patients_clinic_id'];
    const isEmptyField = requiredFields.some(field => !formValues[field]);
    
    if (isEmptyField) {
      // Display an error message or take appropriate action
      setErrorMessage('Wypełnij wszystkie wymagane pola.');
      return;
    }
    try {
      // Create a FormData object to handle the file upload
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key === 'patient_photo' && value === null) {
          return;
        }
        formData.append(key, value);
      });

      console.log(formValues);

      const response = await createPatientRequest(formData);
      console.log('Form submitted!', response);
      openSnackbar('success', 'Pacjent dodany pomyślnie!');
      setTimeout(() => {
        navigate(`/patients/${response.id}`, { replace: true });
      }, 3000);
    } catch (error) {
      console.error('Error:', error.message);
      openSnackbar('error', 'Błąd podczas dodawania pacjenta.');
    }
  };




  const handleFocusPatientName = (e) => {
    setFocusedPatientName(true);
  }
  const handleFocusGender = (e) => {
    setFocusedGender(true);
  }
  const handleFocusSpecies = (e) => {
    setFocusedSpecies(true);
  }
  const handleFocusBreed = (e) => {
    setFocusedBreed(true);
  }
  const handleFocusOwner = (e) => {
    setFocusedOwner(true);
  }
  const handleFocusClinic = (e) => {
    setFocusedClinic(true);
  }

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };


  return (
    <>

      <div className="add-patient">
      <Sidebar />
        <div className='patient-form'>
        <h3 className="text-3xl font-semibold mt-10 mb-10 text-emerald-600">
          Formularz dodawania pacjenta</h3>
          <form onSubmit={handleSubmit}
            encType="multipart/form-data">
            <label>
              <input
                className='input-patientform'
                type="text"
                name="patient_name"
                value={formValues.patient_name}
                placeholder="Imię pacjenta"
                onChange={handleChange}
                required="true"
                onBlur={handleFocusPatientName}
                focused={focusedPatientName.toString()}
              />
              <span className='span-patientform'>Należy podać imię pacjenta</span>
            </label>
            
            <label>
              <select
                className='select-patientform'
                name="patient_gender"
                value={formValues.patient_gender}
                onChange={handleChange}
                required="true"
                onBlur={handleFocusGender}
                focused={focusedGender.toString()}
                >
                <option value="">Wybierz płeć</option>
                <option value="samiec">Samiec</option>
                <option value="samica">Samica</option>
              </select>
              <span className='span-patientform'>Należy wybrać płeć pacjenta</span>
            </label>
            
            <label>
            <select
              className='select-patientform'
              name="patients_species_id"
              value={formValues.patients_species_id}
              onChange={handleChange}
              required="true"
              onBlur={handleFocusSpecies}
              focused={focusedSpecies.toString()}
            >
              <option value="">Wybierz gatunek</option>
              {species.map((specie) => (
                <option key={specie.id} value={specie.id}>
                  {specie.species_name}
                </option>
              ))}
            </select>
            <span className='span-patientform'>Należy wybrać gatunek pacjenta</span>
            </label>
            
            <label>
            <select
              className='select-patientform'
              name="patients_breed_id"
              value={formValues.patients_breed_id}
              onChange={handleChange}
              required="true"
              onBlur={handleFocusBreed}
              focused={focusedBreed.toString()}
            >
              <option value="">Wybierz rasę</option>
              {filteredBreeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.breed_name}
                </option>
              ))}
            </select>
            <span className='span-patientform'>Należy wybrać rasę pacjenta</span>

            </label>
            
            <label>
            <select
              className='select-patientform'
              name="patients_owner_id"
              value={formValues.patients_owner_id}
              onChange={handleChange}
              required="true"
              onBlur={handleFocusOwner}
              focused={focusedOwner.toString()}>
              <option value="">Wybierz właściciela</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {`${owner.owner_first_name} ${owner.owner_last_name}`}
                </option>
              ))}
            </select>
            <span className='span-patientform'>Należy wybrać właściciela pacjenta</span>
            </label>
            
            <label>
            <select
              className='select-patientform'
              name="patients_clinic_id"
              value={formValues.patients_clinic_id}
              onChange={handleChange}
              required="true"
              onBlur={handleFocusClinic}
              focused={focusedClinic.toString()}
            >
              <option value="">Wybierz klinikę</option>
              {clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.id}>
                  {clinic.clinic_name}
                </option>
              ))}
            </select>
            <span className='span-patientform'>Należy wybrać klinikę, do której pacjent ma zostać przypisany</span>
            </label>


            

            <h3>Data urodzenia</h3>
            <div className='patient-form-date'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker

                  placeholder="Data urodzenia"
                  name="patient_date_of_birth"
                  format='YYYY-MM-DD'
                  value={dayjs(formValues.patient_date_of_birth)}
                  onChange={handleDateChange}
                  disabled={!!readOnly}
                  dayOfWeekFormatter={(_day, weekday) => `${weekday.format('dd')}`}
                  sx={{
                    backgroundColor:"white",
                    borderRadius:"10px",

                    "& fieldset": { border: 'none' },
                  }}
                />
              </LocalizationProvider>
            </div>




            <h3>Zdjęcie</h3>
            <input
              className='patient-form-photo'
              type="file"
              accept="image/*"
              name="patient_photo"
              multiple
              onChange={handlePhotoChange}
            />
            {errorMessage &&  <span className='span-patientform-error'>{errorMessage}</span>}

              <div className='button-container-add-patient'>
              <button
              type="submit"
              className="submit-button-add-patient">
              Dodaj pacjenta
            </button>
            </div>


          </form>
        </div>

      </div>
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

export default PatientForm;