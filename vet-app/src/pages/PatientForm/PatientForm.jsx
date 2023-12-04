import React, { useState, useEffect } from 'react';
import { createPatientRequest, patientRequest } from '../../api/patientsRequests';
import { getClinicsRequest } from '../../api/clinicRequests';
import { allBreedsRequest } from '../../api/breedRequests';
import { allSpeciesRequest } from '../../api/speciesRequests';
import { allOwnersRequest } from '../../api/ownerRequests';
import './PatientForm.css'; // Create a CSS file for styling if needed
import Sidebar from '../../components/Sidebar/Sidebar';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import utc from 'dayjs/plugin/utc'; 
import timezone from 'dayjs/plugin/timezone';
import { useNavigate } from 'react-router-dom';


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
      const breedsForSpecies = breeds.filter(breed => breed.breeds_species.id === selectedSpeciesId);
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
  
      // Use the createPatientRequest function with the FormData object
      const response = await createPatientRequest(formData);
      console.log('Form submitted!', response);
      const newPatientId = response.data.id;
  
      // Redirect to the specific patient page
      navigate(`/patients/${newPatientId}`, { replace: true });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      
      <div className="add-patient">
      <Sidebar />
      <div className='patient-form'>
      <form id="formPatient" onSubmit={handleSubmit} 
      encType="multipart/form-data">
            <input
            type="text"
            name="patient_name"
            value={formValues.patient_name || ""}
            placeholder="Imię pacjenta"
            onChange={handleChange}
            required
            />
            <select 
            name="patient_gender"
            value={formValues.patient_gender}
            onChange={handleChange}>
            <option value="">Wybierz płeć</option>
            <option value="male">Męska</option>
            <option value="female">Żeńska</option>
          </select>
          <select
            name="patients_species_id"
            value={formValues.patients_species_id}
            onChange={handleChange}
          >
            <option value="">Wybierz gatunek</option>
            {species.map((specie) => (
              <option key={specie.id} value={specie.id}>
                {specie.species_name}
              </option>
            ))}
          </select>

          <select
            name="patients_breed_id"
            value={formValues.patients_breed_id}
            onChange={handleChange}
          >
            <option value="">Wybierz rasę</option>
            {filteredBreeds.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.breed_name}
              </option>
            ))}
          </select>
          <select
            name="patients_owner_id"
            value={formValues.patients_owner_id}
            onChange={handleChange}>
            <option value="">Wybierz właściciela</option>
            {owners.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {`${owner.owner_first_name} ${owner.owner_last_name}`}
            </option>
            ))} 
          

          </select>



          <select
            name="patients_clinic_id"
            value={formValues.patients_clinic_id}
            onChange={handleChange}
          >
            <option value="">Wybierz klinikę</option>
            {clinics.map((clinic) => (
              <option key={clinic.id} value={clinic.id}>
                {clinic.clinic_name}
              </option>
            ))}
          </select>
          <label>Data urodzenia</label>
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
                    />
                </LocalizationProvider>
          </div>



          
          <label>Zdjęcie</label>
                <input
                  type="file"
                  accept="image/*"
                  name="patient_photo"
                  multiple
                  onChange={handlePhotoChange}
                />
        

        <button 
        type="submit" 
        className="bg-emerald-800 hover:bg-blue-600 px-10 py-2 rounded  text-white hover:shadow-md">
          Dodaj pacjenta
          </button>

      </form>
      </div>

    </div>
      
  </>
    
  );
};

export default PatientForm;