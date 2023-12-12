import React, { useState, useEffect } from "react";
import { createPatientRequest } from "../../../api/patientsRequests";
import { getClinicsRequest } from "../../../api/clinicRequests";
import { allBreedsRequest } from "../../../api/breedRequests";
import { allSpeciesRequest } from "../../../api/speciesRequests";
import { allOwnersRequest } from "../../../api/ownerRequests";
import "./PatientForm.css"; // Create a CSS file for styling if needed
import Sidebar from "../../../components/Sidebar/Sidebar";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useNavigate } from "react-router-dom";

const PatientForm = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    patient_name: "",
    patient_gender: "",
    patient_date_of_birth: "",
    patients_owner_id: "",
    patients_species_id: "",
    patients_breed_id: "",
    patients_clinic_id: "",
    patient_photo: null, // Add this line for the patient photo
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
  const [errorMessage, setErrorMessage] = useState("");

  dayjs.extend(utc);
  dayjs.extend(timezone);
  // Set the time zone to Warsaw (CET)
  dayjs.tz.setDefault("Europe/Warsaw");
  dayjs.locale("en");
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
          getClinicsRequest(),
        ]);

        setOwners(owners);
        setSpecies(species);
        setBreeds(breeds);
        setFilteredBreeds(breeds);
        setClinics(clinics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "patients_species_id") {
      const selectedSpeciesId = parseInt(value);
      const breedsForSpecies = breeds.filter(
        (breed) => breed.breeds_species_id === selectedSpeciesId
      );
      setFilteredBreeds(breedsForSpecies);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
        patients_breed_id: "",
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
        patient_date_of_birth: newValue ? newValue.format("YYYY-MM-DD") : null,
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
    const requiredFields = [
      "patient_name",
      "patient_gender",
      "patients_owner_id",
      "patients_species_id",
      "patients_breed_id",
      "patients_clinic_id",
    ];
    const isEmptyField = requiredFields.some((field) => !formValues[field]);

    if (isEmptyField) {
      // Display an error message or take appropriate action
      setErrorMessage("Wypełnij wszystkie wymagane pola.");
      return;
    }
    try {
      // Create a FormData object to handle the file upload
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key === "patient_photo" && value === null) {
          return;
        }
        formData.append(key, value);
      });

      console.log(formValues);

      const response = await createPatientRequest(formData);
      console.log("Form submitted!", response);
      navigate(`/patients/${response.id}`, { replace: true });
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      //confirmation popup
      setFormValues({
        patient_name: "",
        patient_gender: "",
        patient_date_of_birth: "",
        patients_owner_id: "",
        patients_species_id: "",
        patients_breed_id: "",
        patients_clinic_id: "",
        patient_photo: null
      });
    }
  };

  const handleFocusPatientName = (e) => {
    setFocusedPatientName(true);
  };
  const handleFocusGender = (e) => {
    setFocusedGender(true);
  };
  const handleFocusSpecies = (e) => {
    setFocusedSpecies(true);
  };
  const handleFocusBreed = (e) => {
    setFocusedBreed(true);
  };
  const handleFocusOwner = (e) => {
    setFocusedOwner(true);
  };
  const handleFocusClinic = (e) => {
    setFocusedClinic(true);
  };

  return (
    <div className="patientForm">
      <Sidebar />
      <div className="mainPart">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-semibold mt-6 text-emerald-600">
            Formularz dodawania nowego pacjenta
          </h3>
          <form
            id="patientForm"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              className="patientForm-name"
              type="text"
              name="patient_name"
              value={formValues.patient_name}
              placeholder="Imię pacjenta"
              onChange={handleChange}
              required
              onBlur={handleFocusPatientName}
              focused={focusedPatientName.toString()}
            />
            <div className="main">
              <select
                className="patient-gender"
                name="patient_gender"
                value={formValues.patient_gender}
                onChange={handleChange}
                required
                onBlur={handleFocusGender}
                focused={focusedGender.toString()}
              >
                <option value="">Wybierz płeć</option>
                <option value="samiec">Samiec</option>
                <option value="samica">Samica</option>
              </select>
              <select
                className="patientForm-owner"
                name="patients_owner_id"
                value={formValues.patients_owner_id}
                onChange={handleChange}
                required
                onBlur={handleFocusOwner}
                focused={focusedOwner.toString()}
              >
                <option value="">Wybierz właściciela</option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {`${owner.owner_first_name} ${owner.owner_last_name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="species-breed">
              <select
                className="patient-species"
                name="patients_species_id"
                value={formValues.patients_species_id}
                onChange={handleChange}
                required
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
              <select
                className="patient-breed"
                name="patients_breed_id"
                value={formValues.patients_breed_id}
                onChange={handleChange}
                required
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
            </div>
            <select
              className="patientForm-clinic"
              name="patients_clinic_id"
              value={formValues.patients_clinic_id}
              onChange={handleChange}
              required
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

            <h3 className="text-larger font-semibold text-emerald-600">
              Data urodzenia
            </h3>
            <div className="patient-form-date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  placeholder="Data urodzenia"
                  name="patient_date_of_birth"
                  format="YYYY-MM-DD"
                  value={dayjs(formValues.patient_date_of_birth)}
                  onChange={handleDateChange}
                  disabled={!!readOnly}
                  dayOfWeekFormatter={(_day, weekday) =>
                    `${weekday.format("dd")}`
                  }
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",

                    "& fieldset": { border: "none" },
                  }}
                />
              </LocalizationProvider>
            </div>

            <h3 className="text-larger mt-4 font-semibold text-emerald-600">
              Zdjęcie
            </h3>
            <input
              className="patient-form-photo"
              type="file"
              accept="image/*"
              name="patient_photo"
              multiple
              onChange={handlePhotoChange}
            />
            {errorMessage && (
              <span className="span-patientform-error">{errorMessage}</span>
            )}

            <footer className="flex justify-end mt-3 w-96">
              
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded  text-white hover:shadow-md"
              >
                Dodaj
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
