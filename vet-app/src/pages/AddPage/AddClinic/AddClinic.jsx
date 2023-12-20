import React, { useState, useEffect } from "react";
import "./AddClinic.css";
import { addClinic, updateClinicRequest } from "../../../api/clinicRequests";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';

const AddClinic = ({initialValues, onClose, snackbar}) => {
  const [formValues, setFormValues] = useState({
    clinic_name: "",
    clinic_address: "",
    clinic_postcode: "",
    clinic_city: "",
    clinic_phone_number: "",
    clinic_email: ""
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const clearErrors = (name) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  useEffect(() => {
    const updateFormValues = async () => {
      if (initialValues) {
        setFormValues(initialValues);
      }
    }
    updateFormValues();
  }, [initialValues]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formValues.clinic_name || !formValues.clinic_name.trim()) {
      newErrors.clinic_name = "Podaj nazwę kliniki.";
      valid = false;
    } else {
      newErrors.clinic_name = "";
    }

    if (!formValues.clinic_address || !formValues.clinic_address.trim()) {
      newErrors.clinic_address = "Podaj adres kliniki.";
      valid = false;
    } else {
      newErrors.clinic_address = "";
    }

    if (!formValues.clinic_postcode || !formValues.clinic_postcode.trim()) {
      newErrors.clinic_postcode = "Podaj kod pocztowy kliniki.";
      valid = false;
    } else {
      newErrors.clinic_postcode = "";
    }

    if (!formValues.clinic_city || !formValues.clinic_city.trim()) {
      newErrors.clinic_city = "Podaj miasto kliniki.";
      valid = false;
    } else {
      newErrors.clinic_city = "";
    }
    const postcodeRegex = /^\d{2}-\d{3}$/;
    if (
      formValues.clinic_postcode &&
      !postcodeRegex.test(formValues.clinic_postcode)
    ) {
      newErrors.clinic_postcode = "Zły format kodu pocztowego.";
      valid = false;
    }

    if (
      !formValues.clinic_phone_number ||
      !formValues.clinic_phone_number.trim()
    ) {
      newErrors.clinic_phone_number = "Podaj numer telefonu kliniki.";
      valid = false;
    } else {
      newErrors.clinic_phone_number = "";
    }

    const phoneRegex = /^\d{3} \d{3} \d{3}$/;
    if (
      formValues.clinic_phone_number &&
      !phoneRegex.test(formValues.clinic_phone_number)
    ) {
      newErrors.clinic_phone_number = "Zły format numeru telefonu.";
      valid = false;
    }

    if (!formValues.clinic_email || !formValues.clinic_email.trim()) {
      newErrors.clinic_email = "Podaj email kliniki.";
      valid = false;
    } else {
      newErrors.clinic_email = "";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formValues.clinic_email && !emailRegex.test(formValues.clinic_email)) {
      newErrors.clinic_email = "Podaj poprawny adres e-mail.";
      valid = false;
    } 

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    clearErrors(name);
    if (name === "clinic_postcode" && value.length <= 6) {
      setFormValues({
        ...formValues,
        [name]: value
          .replace(/[^0-9]/g, "")
          .replace(/(\d{2})(\d{0,2})/, "$1-$2"),
      });
    } else if (name === "clinic_phone_number" && value.length <= 9) {
      setFormValues({
        ...formValues,
        [name]: value
          .replace(/[^0-9]/g, "")
          .replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"),
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (!initialValues) {
        const response = await addClinic(formValues);
        console.log("Clinic added successfully", response);
        openSnackbar("success", "Klinika dodana pomyślnie");
        setTimeout(() => {
          navigate(`/calendar`, { replace: true });
        }, 3000);
      } else {
        const response = await updateClinicRequest(initialValues.id, formValues);
        console.log("Clinic updated successfully", response);
        snackbar("success", "Dane kliniki zmienione pomyślnie");
        onClose();
      }
    } catch (error) {
      console.error("Error:", error.message);
      openSnackbar("error", "Błąd podczas dodawania kliniki");
    }
  };

  return (
    <>
      <div className="addClinic">
        <Sidebar />
        <div className="mainPart-addclinic">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-semibold mt-10 text-emerald-600">
              Formularz dodawania nowej kliniki
            </h3>
            <div className="form">
              <form id="formClinic" onSubmit={handleSubmit}>
                <div className="relative pb-8 mt-8 w-72">
                  <input
                    className={`rounded w-72 ${
                      errors.clinic_name ? "border-red-500" : "border-gray-300"
                    }`}
                    name="clinic_name"
                    type="text"
                    value={formValues.clinic_name || ""}
                    placeholder="Nazwa kliniki"
                    onChange={handleInputChange}
                    required
                  />
                  {errors.clinic_name && (
                    <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                      {errors.clinic_name}
                    </span>
                  )}
                </div>
                <div className="relative pb-8 mt-2 w-80">
                  <input
                    className={`rounded w-80 ${
                      errors.clinic_name ? "border-red-500" : "border-gray-300"
                    }`}
                    name="clinic_address"
                    type="text"
                    value={formValues.clinic_address || ""}
                    placeholder="Adres"
                    onChange={handleInputChange}
                    required
                  />
                  {errors.clinic_address && (
                    <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                      {errors.clinic_address}
                    </span>
                  )}
                </div>
                <div className="code-city">
                  <div className="relative pb-8 mt-2 w-48 mr-8">
                    <input
                      type="text"
                      name="clinic_postcode"
                      className={`rounded w-48 ${
                        errors.clinic_postcode
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Kod pocztowy"
                      onChange={handleInputChange}
                      value={formValues.clinic_postcode || ""}
                      maxLength="6"
                      required
                    />
                    {errors.clinic_postcode && (
                      <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                        {errors.clinic_postcode}
                      </span>
                    )}
                  </div>
                  <div className="relative pb-8 mt-2 w-60">
                    <input
                      className={`rounded w-60 ${
                        errors.clinic_city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      name="clinic_city"
                      type="text"
                      placeholder="Miasto"
                      onChange={handleInputChange}
                      value={formValues.clinic_city || ""}
                      required
                    />
                    {errors.clinic_city && (
                      <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                        {errors.clinic_city}
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative pb-8 mt-2 w-60">
                  <input
                    className={`rounded w-60 ${
                      errors.clinic_phone_number
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    type="text"
                    name="clinic_phone_number"
                    placeholder="Telefon"
                    onChange={handleInputChange}
                    value={formValues.clinic_phone_number || ""}
                    maxLength="9"
                    required
                  />
                  {errors.clinic_phone_number && (
                    <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                      {errors.clinic_phone_number}
                    </span>
                  )}
                </div>
                <div className="relative pb-8 mt-2 w-60">
                  <input
                    className={`rounded w-60 ${
                      errors.clinic_email ? "border-red-500" : "border-gray-300"
                    }`}
                    type="email"
                    name="clinic_email"
                    value={formValues.clinic_email || ""}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                  {errors.clinic_email && (
                    <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                      {errors.clinic_email}
                    </span>
                  )}
                </div>
                <span className="flex flex-between w-full items-center">
                  <span className="flex justify-start whitespace-nowrap text-sm text-emerald-950">
                    <h5>Twoja klinika jest już dodana?</h5>
                    <a
                      href="http://localhost:3000/sign-in"
                      className="ml-1 font-semibold"
                    >
                      Zarejestruj się.
                    </a>
                  </span>
                  <footer className="flex justify-end w-96 mb-8">
                  {!initialValues && (<button
                      type="submit"
                      onClick={handleSubmit}
                      className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded  text-white hover:shadow-md"
                    >
                      Dodaj
                    </button>)}
                    {initialValues && (
                    <div className="mx-15vh mt-auto mb-5vh flex justify-center">
                      <button
                      type="submit"
                      onClick={handleSubmit}
                      className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded  text-white hover:shadow-md ml-4"
                    >
                      Edytuj
                    </button>
                    <button
                    type="submit"
                    onClick={() => onClose()}
                    className="bg-red-600 hover:bg-red-800 px-10 py-2 rounded text-white hover:shadow-md ml-4"
                  >
                    Anuluj
                  </button>
                    </div>
                    )}
                  </footer>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default AddClinic;