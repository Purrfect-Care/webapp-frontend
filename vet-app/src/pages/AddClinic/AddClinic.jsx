import React from "react";
import Header from "../../components/Header/Header";
import "./AddClinic.css";
const AddClinic = () => {

  return (
    <div className="addClinic">
      <div className="shadow-md bg-white h-20 flex">
        <Header />
      </div>
      <div className="form">
        <form id="formClinic" method="POST">
          <input
            className="name"
            name="clinic_name"
            type="text"
            value="g"
            placeholder="Nazwa kliniki"
            required
          />
          <input
            className="address"
            name="clinic_address"
            type="text"
            value="g"
            placeholder="Adres"
            required
          />
          <div className="code-city">
            <input
              type="text"
              name="clinic_postcode"
              className="postcode"
              placeholder="Kod pocztowy"
              value="3"
              required
            />
            <input
              className="city"
              name="clinic_city"
              type="text"
              placeholder="Miasto"
              value="g"
              required
            />
          </div>
          <input
            className="phone"
            type="number"
            name="clinic_phone_number"
            placeholder="Telefon"
            value="3"
            required
          />
          <input
            className="email"
            type="email"
            name="clinic_email"
            value="g@dd"
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
