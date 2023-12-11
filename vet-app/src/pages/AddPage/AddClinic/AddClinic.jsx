import React, { useState } from "react";
import "./AddClinic.css";
import { addClinic } from "../../../api/clinicRequests";
import Sidebar from "../../../components/Sidebar/Sidebar";

const AddClinic = () => {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

    try {
      const response = await addClinic(formValues);

      console.log("Clinic added successfully", response);
      // You can perform additional actions here, e.g., redirect the user
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error and provide user feedback if necessary
    }
  };

  return (
    <div className="addClinic">
      <Sidebar />
      <div className="mainPart">
      <div className="flex flex-col items-center">
      <h3 className="text-3xl font-semibold mt-10 mb-10 text-emerald-600">
              Formularz dodawania nowej kliniki
            </h3>
        <div className="form">
          <form id="formClinic" onSubmit={handleSubmit}>
            <input
              className="name"
              name="clinic_name"
              type="text"
              value={formValues.clinic_name || ""}
              placeholder="Nazwa kliniki"
              onChange={handleInputChange}
              required
            />
            <input
              className="address"
              name="clinic_address"
              type="text"
              value={formValues.clinic_address || ""}
              placeholder="Adres"
              onChange={handleInputChange}
              required
            />
            <div className="code-city">
              <input
                type="text"
                name="clinic_postcode"
                className="postcode"
                placeholder="Kod pocztowy"
                onChange={handleInputChange}
                value={formValues.clinic_postcode || ""}
                maxLength="6"
                required
              />
              <input
                className="city"
                name="clinic_city"
                type="text"
                placeholder="Miasto"
                onChange={handleInputChange}
                value={formValues.clinic_city || ""}
                required
              />
            </div>
            <input
              className="phone"
              type="text"
              name="clinic_phone_number"
              placeholder="Telefon"
              onChange={handleInputChange}
              value={formValues.clinic_phone_number || ""}
              maxLength="9"
              required
            />
            <input
              className="email"
              type="email"
              name="clinic_email"
              value={formValues.clinic_email || ""}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <span className="flex flex-between w-full items-center">
              <span className=" flex justify-start whitespace-nowrap text-sm text-emerald-950">
              <h5>Twoja klinika jest już dodana?</h5>
                <a
                  href="http://localhost:3000/sign-in"
                  className="ml-1 font-semibold"
                >
                  Zarejestruj się.
                </a>
              </span>
              <footer className="flex justify-end w-96">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded  text-white hover:shadow-md"
                >
                  Dodaj klinikę
                </button>
              </footer>
            </span>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddClinic;
