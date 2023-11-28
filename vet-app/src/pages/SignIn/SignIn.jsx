import React from "react";
import "./SignIn.css";
import Header from "../../components/Header/Header";

const SignIn = () => {
  return (
    <div className="signIn">
      <div className="shadow-md bg-white h-20 flex">
        <Header />
      </div>
      <div className="formSignIn">
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
        <div>
          <select name="Zawód" className="roles">
            <option value="vet">Weterynarz</option>
            <option value="admin">Administrator</option>
            <option value="reception">Recepcjonista</option>
            <option value="patient">Pacjent</option>
            <option value="me">Me</option>
          </select>
          <select name="Klinika" className="clinics">
            <option value="one">Klinika 1</option>
            <option value="two">Klinika 2</option>
            <option value="three">Klinika 3</option>
            <option value="four">Klinika 4</option>
            <option value="me">Me</option>
          </select>
          <span className=" flex mt-2 justify-end whitespace-nowrap text-sm text-emerald-950">
          <h5>Nie ma Twojej kliniki?</h5>
          <a href="http://localhost:3000/add-clinic" className="ml-1 font-semibold">Dodaj ją.</a>
        </span>
        </div>
        <span className="flex mt-3 flex-between items-center">
          <span className=" flex justify-start whitespace-nowrap text-sm text-emerald-950">
            <h5>Masz już konto?</h5>
            <a href="http://localhost:3000/login" className="ml-1 font-semibold">Zaloguj się.</a>
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
      </div>
    </div>
  );
};

export default SignIn;
