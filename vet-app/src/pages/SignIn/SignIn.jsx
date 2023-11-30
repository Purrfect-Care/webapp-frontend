import React, { useState, useEffect } from "react";
import "./SignIn.css";
import Header from "../../components/Header/Header";
import { getClinicsRequest } from "../../api/clinicRequests";
import { addEmployeeRequest } from "../../api/employeeRequests";
const SignIn = () => {
  const [formValues, setFormValues] = useState({});
  const [clinicsData, setClinicsData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({
      ...formValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call your API function here with formValues
      await addEmployeeRequest(formValues);

      // Handle success or navigate to a different page
    } catch (error) {
      console.error("Error submitting form: " + error);
    }
  };

  useEffect(() => {
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

  return (
    <div className="signIn">
      <div className="shadow-md bg-white h-20 flex">
        <Header />
      </div>
      <div className="formSignIn">
        <form id="siginForm" onSubmit={handleSubmit}>
          <div>
            <input
              className="firstName"
              name="employee_first_name"
              type="text"
              placeholder="Imię"
              value={formValues.employee_first_name || ""}
              onChange={handleInputChange}
              required
            />
            <input
              className="lastName"
              name="employee_last_name"
              type="text"
              placeholder="Nazwisko"
              onChange={handleInputChange}
              value={formValues.employee_last_name || ""}
              required
            />
          </div>
          <input
            className="email"
            name="employee_email"
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={formValues.employee_email || ""}
            required
          />
          <input
            className="password"
            name="employee_password"
            type="password"
            placeholder="Hasło"
            onChange={handleInputChange}
            value={formValues.employee_password || ""}
            required
          />
          <input
            className="address"
            type="text"
            placeholder="Adres"
            name="employee_address"
            onChange={handleInputChange}
            value={formValues.employee_address || ""}
            required
          />
          <div className="cityCode">
            <input
              type="text"
              name="employee_postcode"
              className="postcode"
              placeholder="Kod pocztowy"
              onChange={handleInputChange}
              value={formValues.employee_postcode || ""}
              required
            />
            <input
              className="city"
              type="text"
              placeholder="Miasto"
              onChange={handleInputChange}
              value={formValues.employee_city || ""}
              name="employee_city"
              required
            />
          </div>
          <input
            className="phone"
            type="number"
            placeholder="Telefon"
            onChange={handleInputChange}
            value={formValues.employee_phone_number || ""}
            name="employee_phone_number"
            required
          />
          <div>
            <select name="employee_role" className="roles">
              <option value="vet">Weterynarz</option>
              <option value="admin">Administrator</option>
              <option value="reception">Recepcjonista</option>
              <option value="patient">Pacjent</option>
              <option value="me">Me</option>
            </select>
            <select
              name="employee_clinic_id"
              className="clinics"
              onChange={handleInputChange}
              value={formValues.employee_clinic_id || ""}
            >
              {clinicsData.map((clinic) => (
                <option key={clinic.id} value={clinic.clinic_name}>
                  {clinic.clinic_name}
                </option>
              ))}
            </select>
            <span className=" flex mt-2 justify-end whitespace-nowrap text-sm text-emerald-950">
              <h5>Nie ma Twojej kliniki?</h5>
              <a
                href="http://localhost:3000/add-clinic"
                className="ml-1 font-semibold"
              >
                Dodaj ją.
              </a>
            </span>
          </div>
          <span className="flex mt-3 flex-between items-center">
            <span className=" flex justify-start whitespace-nowrap text-sm text-emerald-950">
              <h5>Masz już konto?</h5>
              <a
                href="http://localhost:3000/login"
                className="ml-1 font-semibold"
              >
                Zaloguj się.
              </a>
            </span>
            <footer className="flex justify-end w-96">
              <button
                type="submit"
                className="bg-emerald-800 hover:bg-blue-600 px-10 py-2 rounded  text-white hover:shadow-md"
              >
                Zaloguj się
              </button>
            </footer>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
