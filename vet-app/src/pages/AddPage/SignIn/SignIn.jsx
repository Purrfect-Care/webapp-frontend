import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { getClinicsRequest } from "../../../api/clinicRequests";
import { editEmployeeRequest, addEmployeeRequest } from "../../../api/employeesRequest";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';


const SignIn = ({initialValues, onClose, snackbar}) => {
  const [formValues, setFormValues] = useState({
    employee_role: '',
    employee_first_name: '',
    employee_last_name: '',
    employee_address: '',
    employee_postcode: '',
    employee_city: '',
    employee_phone_number: '',  // Add this line for the patient photo
    employee_email: '',
    employee_password: '',
    employees_clinic_id: null,
  });

  const [clinicsData, setClinicsData] = useState([]);
  //const [formValues, setFormValues] = useState({});
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

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (
      !formValues.employee_first_name ||
      !formValues.employee_first_name.trim()
    ) {
      newErrors.employee_first_name = "Podaj imię pracownika.";
      valid = false;
    } else {
      newErrors.employee_first_name = "";
    }

    if (
      !formValues.employee_last_name ||
      !formValues.employee_last_name.trim()
    ) {
      newErrors.employee_last_name = "Podaj nazwisko pracownika.";
      valid = false;
    } else {
      newErrors.employee_last_name = "";
    }

    if (!formValues.employee_email || !formValues.employee_email.trim()) {
      newErrors.employee_email = "Podaj email pracownika.";
      valid = false;
    } else {
      newErrors.employee_email = "";
    }

    if (!formValues.employee_password || !formValues.employee_password.trim()) {
      newErrors.employee_password = "Podaj hasło pracownika.";
      valid = false;
    } else {
      newErrors.employee_password = "";
    }

    

    if (!formValues.employee_address || !formValues.employee_address.trim()) {
      newErrors.employee_address = "Podaj adres pracownika.";
      valid = false;
    } else {
      newErrors.employee_address = "";
    }

    if (!formValues.employee_postcode || !formValues.employee_postcode.trim()) {
      newErrors.employee_postcode = "Podaj kod pocztowy pracownika.";
      valid = false;
    } else {
      newErrors.employee_postcode = "";
    }

    if (!formValues.employee_city || !formValues.employee_city.trim()) {
      newErrors.employee_city = "Podaj miasto pracownika.";
      valid = false;
    } else {
      newErrors.employee_city = "";
    }

    if (
      !formValues.employee_phone_number ||
      !formValues.employee_phone_number.trim()
    ) {
      newErrors.employee_phone_number = "Podaj numer telefonu pracownika.";
      valid = false;
    } else {
      newErrors.employee_phone_number = "";
    }

    if (!formValues.employee_role || !formValues.employee_role.trim()) {
      newErrors.employee_role = "Wybierz rolę pracownika.";
      valid = false;
    } else {
      newErrors.employee_role = "";
    }
    const phoneRegex = /^\d{3} \d{3} \d{3}$/;
    if (
      formValues.employee_phone_number &&
      !phoneRegex.test(formValues.employee_phone_number)
    ) {
      newErrors.employee_phone_number = "Zły format numeru telefonu.";
      valid = false;
    }

    const postcodeRegex = /^\d{2}-\d{3}$/;
    if (
      formValues.employee_postcode &&
      !postcodeRegex.test(formValues.employee_postcode)
    ) {
      newErrors.employee_postcode = "Zły format kodu pocztowego.";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formValues.employee_email && !emailRegex.test(formValues.employee_email)) {
      newErrors.employee_email = "Podaj poprawny adres e-mail.";
      valid = false;
    } 

    if (
      !formValues.employees_clinic_id
    ) {
      newErrors.employees_clinic_id = "Wybierz klinikę pracownika.";
      valid = false;
    } else {
      newErrors.employees_clinic_id = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    clearErrors(name);
    if (name === "employee_postcode" && value.length <= 6) {
      setFormValues({
        ...formValues,
        [name]: value
          .replace(/[^0-9]/g, "")
          .replace(/(\d{2})(\d{0,2})/, "$1-$2"),
      });
    } else if (name === "employee_phone_number" && value.length <= 9) {
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
    if (!initialValues){
      try {
        await addEmployeeRequest(formValues);
        openSnackbar("success", "Pracownik dodany pomyślnie");
        setFormValues({});
      } catch (error) {
        console.error("Error submitting form: " + error);
        openSnackbar("error", "Błąd podczas dodawania pracownika");
      }
    } else {
        const response = await editEmployeeRequest(initialValues.id, formValues);
        console.log('Form submitted!', response);
        snackbar('success', 'Dane pracownika zmienione pomyślnie!');
        onClose();
      }
    

    
  };

  useEffect(() => {
    console.log("Fetching clinics data...");
    const fetchData = async () => {
      try {
        const clinicsData = await getClinicsRequest();
        setClinicsData(clinicsData);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateFormValues = async () => {
      if (initialValues) {
        setFormValues(initialValues);
      }
    }
    updateFormValues();
  }, [initialValues]);

  return (
    <>
      <div className="signIn">
        <Sidebar />
        <div className="mainPart-signin">
          <div className="flex flex-col items-center">
          <h3 class="text-2xl font-semibold mr-6 mt-8 mb-6 text-emerald-600">
            Formularz dodawania nowego pracownika
            </h3>
            <div className="formSignIn">
              <form id="siginForm" onSubmit={handleSubmit}>
                <div className="main">
                  <div className="relative pb-7 mr-10 w-56">
                    <input
                      className={`rounded ${
                        errors.employee_first_name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      name="employee_first_name"
                      type="text"
                      placeholder="Imię"
                      value={formValues.employee_first_name || ""}
                      onChange={handleInputChange}
                    />
                    {errors.employee_first_name && (
                      <span className="text-red-500 text-sm absolute right-0">
                        {errors.employee_first_name}
                      </span>
                    )}
                  </div>
                  <div className="relative pb-7 w-56">
                    <input
                      className={`rounded ${
                        errors.employee_first_name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      name="employee_last_name"
                      type="text"
                      placeholder="Nazwisko"
                      onChange={handleInputChange}
                      value={formValues.employee_last_name || ""}
                    />
                    {errors.employee_last_name && (
                      <span className="text-red-500 text-sm absolute right-0">
                        {errors.employee_last_name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative pb-7 w-56">
                  <input
                    className={`rounded ${
                      errors.employee_email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="employee_email"
                    type="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={formValues.employee_email || ""}
                  />
                  {errors.employee_email && (
                    <span className="text-red-500 text-sm absolute right-0">
                      {errors.employee_email}
                    </span>
                  )}
                </div>
                <div className="relative pb-7 w-56">
                  <input
                    className={`rounded ${
                      errors.employee_password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="employee_password"
                    type="password"
                    placeholder="Hasło"
                    onChange={handleInputChange}
                    value={formValues.employee_password || ""}
                  />
                  {errors.employee_password && (
                    <span className="text-red-500 text-sm absolute right-0">
                      {errors.employee_password}
                    </span>
                  )}
                </div>
                <div className="relative pb-7 w-96">
                  <input
                    className={`rounded w-96 ${
                      errors.employee_address
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Adres"
                    name="employee_address"
                    onChange={handleInputChange}
                    value={formValues.employee_address || ""}
                  />
                  {errors.employee_address && (
                    <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                      {errors.employee_address}
                    </span>
                  )}
                </div>
                <div className="code-city">
                  <div className="relative pb-7 mr-10 w-56">
                    <input
                      type="text"
                      name="employee_postcode"
                      className={`rounded ${
                        errors.employee_postcode
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Kod pocztowy"
                      onChange={handleInputChange}
                      value={formValues.employee_postcode || ""}
                      maxLength="6"
                    />
                    {errors.employee_postcode && (
                      <span className="text-red-500 text-sm absolute right-0">
                        {errors.employee_postcode}
                      </span>
                    )}
                  </div>
                  <div className="relative pb-7 mr-10 w-56">
                    <input
                      className={`rounded ${
                        errors.employee_city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      type="text"
                      placeholder="Miasto"
                      onChange={handleInputChange}
                      value={formValues.employee_city || ""}
                      name="employee_city"
                    />
                    {errors.employee_city && (
                      <span className="text-red-500 text-sm absolute right-0">
                        {errors.employee_city}
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative pb-7 w-56">
                  <input
                    className={`rounded ${
                      errors.employee_phone_number
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Telefon"
                    onChange={handleInputChange}
                    value={formValues.employee_phone_number || ""}
                    name="employee_phone_number"
                    maxLength="9"
                  />
                  {errors.employee_phone_number && (
                    <span className="text-red-500 text-sm absolute right-0">
                      {errors.employee_phone_number}
                    </span>
                  )}
                </div>
                <div className="role-clinics">
                  <div className="relative pb-7 mr-10 w-56">
                    <select
                      name="employee_role"
                      className={`rounded w-56 ${
                        errors.employee_role
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={handleInputChange}
                      value={formValues.employee_role}
                    >
                      <option value="">Wybierz rolę</option>
                      <option value="Weterynarz">Weterynarz</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                    {errors.employee_role && (
                      <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                        {errors.employee_role}
                      </span>
                    )}
                  </div>
                  <div className="relative pb-7 w-72">
                    <select
                      name="employees_clinic_id"
                      className={`rounded w-72 ${
                        errors.employees_clinic_id
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={handleInputChange}
                      value={formValues.employees_clinic_id}
                    >
                      <option value="">Wybierz klinikę</option>
                      {clinicsData.map((clinic) => (
                        <option key={clinic.id} value={clinic.id}>
                          {clinic.clinic_name}
                        </option>
                      ))}
                    </select>
                    {errors.employees_clinic_id && (
                      <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                        {errors.employees_clinic_id}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between w-full items-center">
                  <div className="text-sm text-emerald-950 whitespace-nowrap ">
                    <h5>Nie ma odpowiedniej kliniki?</h5>
                    <a
                      href="http://localhost:3000/add-clinic"
                      className="font-semibold"
                    >
                      Dodaj ją.
                    </a>
                  </div>
                  {!initialValues && <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded text-white hover:shadow-md"
                  >
                    Dodaj
                  </button>}
                  {initialValues && (
                <div className="mx-15vh mt-auto mb-5vh flex justify-center">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded text-white hover:shadow-md mr-10"
                  >
                    Edytuj
                  </button>
                  <button
                    type="submit"
                    onClick={() => onClose()}
                    className="bg-red-600 hover:bg-red-800 px-10 py-2 rounded text-white hover:shadow-md"
                  >
                    Anuluj
                  </button>
                </div>
              )}
                </div>
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

export default SignIn;
