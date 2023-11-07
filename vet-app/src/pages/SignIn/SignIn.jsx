import React from "react";
import "./SignIn.css";
import Header from "../../components/Header/Header";

const SignIn = () => {
  return (
    <div className="signIn">
      <div className="shadow-md bg-white h-20 flex">
        <Header className="ml-4" />
      </div>
      <div className="form">
        <div className="main">
          <input
            className="firstName"
            type="text"
            placeholder="Imię"
            required
          />
          <input
            className="lastName"
            type="text"
            placeholder="Nazwisko"
            required
          />
        </div>
        
        <input className="email" type="email" placeholder="Email" required />
        <input
          className="password"
          type="password"
          placeholder="Hasło"
          required
        />
        <input className="address" type="text" placeholder="Adres" required />
        <div className="cityCode">
        <input
          type="text"
          name="postcode"
          className="postcode"
          pattern="\d{2}-\d{3}"
          placeholder="Kod pocztowy"
          required
        />
        <input className="city" type="text" placeholder="Miasto" required />
        </div>
        <input className="phone" type="number" placeholder="Telefon" required />
        <select name="Zawód" className="role">
          <option value="vet">Weterynarz</option>
          <option value="admin">Administrator</option>
          <option value="reception">Recepcjonista</option>
          <option value="patient">Patient</option>
          <option value="me">Me</option>
        </select>
      </div>
    </div>
  );
};

export default SignIn;
