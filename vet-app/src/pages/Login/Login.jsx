import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";


const Login = ( {isAdministrator} ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Handle success

        // Store employee data in local storage
        localStorage.setItem('employeeData', JSON.stringify(data.employee));
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authTokenExpiration', Math.floor(data.expiration_time));
        routeChange();
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  let navigate = useNavigate();
  const routeChange = () => {
      let path = '/calendar';
      navigate(path);
  }

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      // Call your login function here
      handleLogin();
    }
  };
  
  return (
    <div className="bg-customGreen h-screen overflow-hidden">
      <div className="shadow-md bg-white h-20 flex">
        <Header />
      </div>
      <div className="h-full flex flex-col items-center space-y-10 mt-36">
        <input
          className="rounded h-12 w-96 border-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <input
          className="rounded h-12 w-96 border-none"
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <span className="flex flex-between w-96 items-center">
          <footer className="flex justify-end w-96">
            <button
              type="submit"
              onClick={handleLogin}
              className="bg-emerald-800 hover:bg-emerald-900 px-10 py-2 rounded  text-white hover:shadow-md"
            >
              Zaloguj się
            </button>
          </footer>
        </span>
      </div>
    </div>
  );
};

export default Login;
