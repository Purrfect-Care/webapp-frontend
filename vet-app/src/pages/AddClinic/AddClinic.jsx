import React, {useState} from "react";
import Header from "../../components/Header/Header";
import "./AddClinic.css";
import { addClinic } from "../../api/clinicRequests";

const AddClinic = () => {
    const [formValues, setFormValues] = useState({
      clinic_name: "",
      clinic_address: "",
      clinic_postcode: "",
      clinic_city: "",
      clinic_phone_number: "",
      clinic_email: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
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
      <div className="shadow-md bg-white h-20 flex">
        <Header />
      </div>
      <div className="form">
        <form id="formClinic" onSubmit={handleSubmit}>
            value={formValues.clinic_name}
            placeholder="Nazwa kliniki"
            onChange={handleInputChange}
            required
          />
          <input
            className="address"
            name="clinic_address"
            type="text"
            value={formValues.clinic_address}
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
              value={formValues.clinic_postcode}
              required
            />
            <input
              className="city"
              name="clinic_city"
              type="text"
              placeholder="Miasto"
              onChange={handleInputChange}
              value={formValues.clinic_city}
              required
            />
          </div>
          <input
            className="phone"
            type="number"
            name="clinic_phone_number"
            placeholder="Telefon"
            onChange={handleInputChange}
            value={formValues.clinic_phone_number}
            required
          />
          <input
            className="email"
            type="email"
            name="clinic_email"
            value={formValues.clinic_email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <footer className="flex justify-end w-96">
            <button
              type="submit"
              className="bg-emerald-800 hover:bg-blue-600 px-10 py-2 rounded  text-white hover:shadow-md"
            >
              Dodaj klinikę
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AddClinic;
