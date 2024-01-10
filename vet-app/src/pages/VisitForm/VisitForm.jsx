import React, { useState, useEffect } from 'react';
import { patientRequest, allPatientsRequest } from '../../api/patientsRequests';
import { visitTypeRequest } from '../../api/visitTypeRequest'
import { visitSubtypeRequest } from '../../api/visitSubtypeRequest'
import { employeeRequest, employeesByRole } from '../../api/employeesRequest';
import './VisitForm.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';  // Import the utc plugin
import timezone from 'dayjs/plugin/timezone';
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import {
  getPhotosByVisitId,
  deletePhotoById,
  createPhotoRequest,
  patchUpdatePhotoRequest,
} from "../../api/photosRequests";
import ConfirmationPopup from "../../components/ConifrmationPopup/ConfirmationPopup";
import PhotoAddPopup from "../../components/addVisitPhoto/addVisitPhoto";
import PhotoEditPopup from "../../components/updatePhoto/updatePhoto";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { jwtDecode } from 'jwt-decode';


const VisitForm = ({
  onClose,
  initialValues,
  setEdit,
  onSubmit,
  editOnly = false,
}) => {
  const authToken = localStorage.getItem('authToken');
  const employeeDataFormValues = jwtDecode(authToken);
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
    visits_employee_id: " ",
    visits_clinic_id: employeeDataFormValues.employees_clinic_id
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
  const [errorMessage, setErrorMessage] = useState("");
  const [vets, setVets] = useState([]);
  const [isPhotoAddPopupOpen, setIsPhotoAddPopupOpen] = useState(false);
  const [isPhotoEditPopupOpen, setIsPhotoEditPopupOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [sortBy, setSortBy] = useState({ column: "DATA", ascending: true });
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [photoToEdit, setPhotoToEdit] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [focusedEmployee, setFocusedEmployee] = useState(false);

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    // Fetch employee data from local storage
    const authToken = localStorage.getItem('authToken');
    const storedEmployeeData = jwtDecode(authToken);
    if (storedEmployeeData) {
      setEmployeeData(storedEmployeeData);
    }
  }, []);

  // const formatDuration = (duration) => {
  //   const [hours, minutes] = duration.split(':');

  //   return `${hours}:${minutes}`;
  // };

  const addPhotoField = () => {
    setPhotos((prevPhotos) => [
      ...prevPhotos,
      { image: null, photo_description: "", id: null, photos_visit_id: null },
    ]);
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
      updatedPhotos[index].photo_description = value;
      return updatedPhotos;
    });
  };

  dayjs.extend(utc);
  dayjs.extend(timezone);
  // Set the time zone to Warsaw (CET)
  dayjs.tz.setDefault("Europe/Warsaw");
  dayjs.locale("en");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const employeeData = jwtDecode(authToken);
        const [visitTypes, visitSubtypes, patients, employeeJSON, vetsData] =
          await Promise.all([
            visitTypeRequest(),
            visitSubtypeRequest(),
            allPatientsRequest(),
            employeeRequest(initialValues.visits_employee_id),
            employeesByRole("Weterynarz", employeeData?.employees_clinic_id),
          ]);

        if (
          initialValues.visits_patient_id != null &&
          initialValues.visits_patient_id != ""
        ) {
          const patientJSON = await patientRequest(
            initialValues.visits_patient_id
          );
          setPatient(patientJSON);
        }
        setEmployee(employeeJSON);
        setAllTypes(visitTypes);
        setAllSubtypes(visitSubtypes);
        setAllPatients(patients);
        setVets(vetsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortedPatients = allPatients.slice().sort((a, b) => {
    const nameA = a.patient_name.toLowerCase();
    const nameB = b.patient_name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const sortedEmployees = vets.slice().sort((a, b) => {
    const nameA = a.employee_first_name.toLowerCase() + a.employee_last_name.toLowerCase();
    const nameB = a.employee_first_name.toLowerCase() + a.employee_last_name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
      const typeId = initialValues.visits_visit_type_id;
      const subtypes = allSubtypes.filter(
        (subtype) => subtype.visit_subtypes_visit_type_id === typeId
      );
      setSubtypesForSelectedType(subtypes);

      const fetchPhotos = async () => {
        const visitPhotos = await getPhotosByVisitId(initialValues.id);
        setPhotos(visitPhotos);
      };

      if (initialValues.id) fetchPhotos();
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
      setFormValues({
        ...formValues,
        [name]: value
          .replace(/[^0-9]/g, "")
          .replace(/(\d{2})(\d{0,2})/, "$1:$2"),
      });
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
    const requiredFields = [
      "visits_patient_id",
      "visits_visit_type_id",
      "visits_visit_subtype_id",
      "visit_status",
      "visit_datetime",
      "visit_duration",
      "visits_employee_id",
    ];
    const isEmptyField = requiredFields.some((field) => !formValues[field]);
    const isPhotoEmpty = photos.some((photo) => !photo.image);

    if (isEmptyField || isPhotoEmpty) {
      // Display an error message or take appropriate action
      setErrorMessage("Wypełnij wszystkie wymagane pola.");
      return;
    }
  
    console.log('Form submitted!');
    try {
        await onSubmit({ ...formValues, photos });
        console.log(formValues);
        onClose();
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
  };
  const handleFocusDuration = (e) => {
    setFocusedDuration(true);
  };
  const handleFocusStatus = (e) => {
    setFocusedStatus(true);
  };
  const handleFocusSubtype = (e) => {
    setFocusedSubtype(true);
  };
  const handleFocusType = (e) => {
    setFocusedType(true);
  };
  const handleFocusEmployee = (e) => {
    setFocusedEmployee(true);
  };

  const editPhoto = (photo) => {
    setPhotoToEdit(photo);
    setIsPhotoEditPopupOpen(true);
  };

  const addPhoto = () => {
    setIsPhotoAddPopupOpen(true);
  };

  const deletePhoto = (photo) => {
    setPhotoToDelete(photo);
    setShowConfirmation(true);
  };

  const cancelDeletePhoto = () => {
    setShowConfirmation(false);
  };

  const sortColumn = (column) => {
    if (sortBy.column === column) {
      setSortBy({ column, ascending: !sortBy.ascending });
    } else {
      setSortBy({ column, ascending: true });
    }
  };

  const confirmDeletePhoto = async () => {
    try {
      if (!photoToDelete || !photoToDelete.id) {
        console.error("No selected visit or visit ID");
        return;
      }
      const photoId = photoToDelete.id;
      await deletePhotoById(photoId);
      openSnackbar("success", "Usuwanie zdjęcia zakończone sukcesem!");
      console.log("snackbar: ", snackbarMessage, snackbarSeverity);
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== photoToDelete.id)
      );
    } catch (error) {
      console.error("Error deleting photo:", error);
      openSnackbar("error", "Błąd podczas usuwania zdjęcia.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const sortedPhotos = [...photos].sort((a, b) => {
    if (sortBy.column === "PLIK") {
      const nameA = a.image;
      const nameB = b.image;
      return sortBy.ascending
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    } else if (sortBy.column === "OPIS") {
      const descA = a.photo_description;
      const descB = b.photo_description;
      return sortBy.ascending
        ? descA.localeCompare(descB)
        : descB.localeCompare(descA);
    }
    return 0;
  });

  const handlePhotoAddPopupSave = async (photos) => {
    if (photos) {
      try {
        for (const photo of photos) {
          const photoData = {
            photo_description: photo.photo_description,
            image: photo.image,
            photos_visit_id: photo.photos_visit_id,
          };

          const finalPhotoData = new FormData();
          Object.entries(photoData).forEach(([key, value]) => {
            finalPhotoData.append(key, value);
          });
          console.log("Final data: ", finalPhotoData);
          await createPhotoRequest(finalPhotoData);

          const newPhotos = await getPhotosByVisitId(initialValues.id);
          setPhotos(newPhotos);

          openSnackbar("success", "Dodawanie zdjęć zakończone sukcesem!");
        }
      } catch (error) {
        console.error("Error deleting photo:", error);
        openSnackbar("error", "Błąd podczas dodawania zdjęć.");
      }
    }
    setIsPhotoAddPopupOpen(false);
  };

  const handlePhotoAddPopupCancel = () => {
    setIsPhotoAddPopupOpen(false);
  };

  const handlePhotoEditPopupSave = async (photo) => {
    try {
      const finalPhotoData = new FormData();
      Object.entries(photo).forEach(([key, value]) => {
        if (key === "image" && value === null) return;
        finalPhotoData.append(key, value);
      });

      console.log("Final data: ", finalPhotoData);
      await patchUpdatePhotoRequest(finalPhotoData, photo.id);

      const newPhotos = await getPhotosByVisitId(initialValues.id);
      setPhotos(newPhotos);

      openSnackbar("success", "Edycja zdjęcia zakończona sukcesem!");
    } catch (error) {
      console.error("Error deleting photo:", error);
      openSnackbar("error", "Błąd podczas edycji zdjęcia.");
    }
    setIsPhotoEditPopupOpen(false);
  };

  const handlePhotoEditPopupCancel = () => {
    setIsPhotoEditPopupOpen(false);
  };

  return (
    <div>
      <div className={`overlay-visit-form ${isFormOpen ? "active" : ""}`}></div>
      <div className="popup-form-visit">
        <div className="scrollable-area">
          <h2>Formularz wizyty</h2>
          <form onSubmit={handleSubmit} className="form-sections-visit">
            <div className="form-section-visit">
              <h3>Weterynarz</h3>
              {(employeeData?.employee_role === "Administrator" || employeeData?.employee_role === "SuperAdmin") ? (
                <label>
                  Imię i nazwisko
                  <select
                    className="select-visitform select-employee"
                    name="visits_employee_id"
                    value={formValues.visits_employee_id || ""}
                    onChange={handleChange}
                    required="true"
                    onBlur={handleFocusEmployee}
                    focused={focusedEmployee.toString()}
                  >
                    <option value="">Wybierz weterynarza</option>
                    {sortedEmployees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.employee_first_name}{" "}
                        {employee.employee_last_name}{" "}
                      </option>
                    ))}
                  </select>
                  <span className="span-visitform">Należy wybrać weterynarza</span>
                </label>
              ) : (
                <label>
                  Imię i nazwisko
                  <div className="name-visit">
                    <p className="employee-name">{`${
                      employee.employee_first_name || ""
                    } ${employee.employee_last_name || ""}`}</p>
                  </div>
                </label>
              )}
            </div>
            <div className="form-section-visit">
              <h3>Pacjent</h3>
              <label>
                Nazwa pacjenta (wymagane)
                <div className="name-visit">
                  <a
                    href={`http://localhost:3000/patients/${formValues.visits_patient_id}`}
                  >
                    {patientData.patient_name}
                  </a>
                </div>
                {!initialValues.visits_patient_id && (
                  <select
                    className="select-visitform"
                    name="visits_patient_id"
                    value={formValues.visits_patient_id || ""}
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
                  </select>
                )}
                <span className="span-visitform">Należy wybrać pacjenta</span>
              </label>
              <label>
                Waga pacjenta (kg)
                <input
                  className="input-visitform"
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
                  className="input-visitform"
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
                    className="select-visitform"
                    name="visits_visit_type_id"
                    value={formValues.visits_visit_type_id || ""}
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
                  <span className="span-visitform">
                    Należy wybrać typ wizyty
                  </span>
                </label>
                <label>
                  Podtyp wizyty (wymagane)
                  <select
                    className="select-visitform"
                    name="visits_visit_subtype_id"
                    value={formValues.visits_visit_subtype_id || ""}
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
                  <span className="span-visitform">
                    Należy wybrać podtyp wizyty
                  </span>
                </label>
                <label>
                  Status wizyty (wymagane)
                  <select
                    className="select-visitform"
                    name="visit_status"
                    value={formValues.visit_status || ""}
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
                  <span className="span-visitform">
                    Należy wybrać status wizyty
                  </span>
                </label>
                <div className="form-section-column-visit">
                  <label>
                    Data i godzina wizyty (wymagane)
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          name="visit_datetime"
                          ampm={false}
                          value={dayjs(formValues.visit_datetime)}
                          onChange={handleDateTimeChange}
                          dayOfWeekFormatter={(_day, weekday) =>
                            `${weekday.format("dd")}`
                          }
                          sx={{
                            borderRadius: "10px",
                            border: "1px solid #000000",
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  </label>
                  <label>
                    Czas trwania wizyty (wymagane)
                    <div>
                      <input
                        className="input-visitform-duration"
                        type="text"
                        name="visit_duration"
                        value={formValues.visit_duration}
                        onChange={handleChange}
                        required="true"
                        onBlur={handleFocusDuration}
                        focused={focusedDuration.toString()}
                        pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                        maxLength="5"
                      />
                      <span className="span-visitform">
                        Należy wypełnić czas trwania wizyty (poprawny format to
                        HH:mm)
                      </span>
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
              {initialValues.id == null ? (
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
                              <span className="span-visitform">
                                Należy wybrać zdjęcie
                              </span>
                            </div>
                          </label>
                          <div>
                            &zwnj;
                            <div>
                              <button
                                className="delete-photo-row"
                                type="button"
                                onClick={() => removePhotoField(index)}
                              >
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
                                value={photo.photo_description}
                                onChange={(e) =>
                                  handleDescriptionChange(index, e)
                                }
                              />
                            </div>
                          </label>
                        </div>
                      </>
                    ))}
                    <button
                      className="add-photo-row"
                      type="button"
                      onClick={addPhotoField}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              ) : photos.length > 0 ? (
                <div className="form-section-visit">
                  <h3>Zdjęcia</h3>
                  <div className="photos-table">
                    <div className="edit-photos-column-bar">
                      <span
                        className="column-file"
                        onClick={() => sortColumn("PLIK")}
                      >
                        PLIK{" "}
                        {sortBy.column === "PLIK" &&
                          (sortBy.ascending ? "↑" : "↓")}
                      </span>
                      <span
                        className="column-description"
                        onClick={() => sortColumn("OPIS")}
                      >
                        OPIS{" "}
                        {sortBy.column === "OPIS" &&
                          (sortBy.ascending ? "↑" : "↓")}
                      </span>
                      <span className="column-photo_edit">EDYTUJ</span>
                      <span className="column-photo_delete">USUŃ</span>
                      <div className="photo-add">
                        <button
                          onClick={() => addPhoto()}
                          className="photo-add-button"
                          type="button"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div className="photo-list">
                      {sortedPhotos.map((photo) => (
                        <div key={photo.id} className="edit-photo-item">
                          <div className="photo-name">
                            <a
                              href={photo.image}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {photo.image.split("/").pop()}
                            </a>
                          </div>
                          <div className="photo-description">
                            {photo.photo_description}
                          </div>
                          <div className="photo-edit">
                            <button
                              type="button"
                              onClick={() => editPhoto(photo)}
                            >
                              <FaPen />
                            </button>
                          </div>
                          <div className="photo-delete">
                            <button
                              onClick={() => deletePhoto(photo)}
                              className="delete-button"
                              type="button"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-section-visit">
                  <h3>Zdjęcia</h3>
                  <button
                    onClick={() => addPhoto()}
                    className="photo-add-button"
                    type="button"
                  >
                    <FaPlus />
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="button-container-visit">
          {errorMessage && (
            <span className="span-visitform-error">{errorMessage}</span>
          )}
          <button
            className="form-button-visit"
            onClick={handleSubmit}
            type="submit"
          >
            Zatwierdź
          </button>
          <button
            className="form-button-visit"
            onClick={() => {
              if (editOnly) onClose();
              else setEdit(false);
            }}
          >
            Anuluj
          </button>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationPopup
          message="Czy na pewno chcesz usunąć zdjęcie?"
          onConfirm={confirmDeletePhoto}
          onCancel={cancelDeletePhoto}
          onYes="Tak"
          onNo="Nie"
        />
      )}
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
      {isPhotoAddPopupOpen && (
        <PhotoAddPopup
          onSubmit={handlePhotoAddPopupSave}
          onClose={handlePhotoAddPopupCancel}
          visitId={initialValues.id}
          isFormOpen={isPhotoAddPopupOpen}
        />
      )}
      {isPhotoEditPopupOpen && (
        <PhotoEditPopup
          photo={photoToEdit}
          onSubmit={handlePhotoEditPopupSave}
          onClose={handlePhotoEditPopupCancel}
          isFormOpen={isPhotoEditPopupOpen}
        />
      )}
    </div>
  );
};

export default VisitForm;
