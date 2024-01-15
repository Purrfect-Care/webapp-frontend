import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import GlobalContext from "../../context/GlobalContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpenlog, setSnackbarOpenlog] = useState(false);
  const [snackbarSeveritylog, setSnackbarSeveritylog] = useState("success");
  const [snackbarMessagelog, setSnackbarMessagelog] = useState("");
  const { setComesFromLogin, setLoggingOut, loggingOut, setEvents, setIsLoggedIn, isLoggedIn } = useContext(GlobalContext);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const openSnackbar = (severity, message) => {
    setSnackbarSeveritylog(severity);
    setSnackbarMessagelog(message);
    setSnackbarOpenlog(true);
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

    if (!email.trim()) {
      newErrors.email = "Podaj email.";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!password) {
      newErrors.password = "Podaj hasło.";
      valid = false;
    } else {
      newErrors.password = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Podaj poprawny adres e-mail.";
      valid = false;
    } 

    setErrors(newErrors);
    return valid;
  };


  useEffect(() => {
    if (loggingOut) {
      setEvents([]);
      openSnackbar("success", "Wylogowano pomyślnie!");
      setIsLoggedIn(false);
      setLoggingOut(false);
    }
  }, [loggingOut]);

  const handleLogin = async (e) => {

    if (!validateForm()) {
      return;
    }

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
        setIsLoggedIn(true);
        setComesFromLogin(true);
        console.log(isLoggedIn);

        // Store employee data in local storage
   
        localStorage.setItem("authToken", data.token);
        localStorage.setItem(
          "authTokenExpiration",
          Math.floor(data.expiration_time)
        );
        if (data.employee.employee_role === "SuperAdmin")
        {
          routeChangeSuperAdmin();
        }
        else
        {
          routeChange();
        }
      } else {
        const errorData = await response.json();
        setEmail("");
        setPassword("");
        openSnackbar(
          "error",
          "Nieprawidłowe dane logowania. Spróbuj ponownie."
        );
        console.error("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/calendar";
    navigate(path, {
      state: { snackbarOpenlog, snackbarSeveritylog, snackbarMessagelog },
    });
  };
  const routeChangeSuperAdmin = () => {
    let path = "/select_clinic";
    navigate(path, {
      state: { snackbarOpenlog, snackbarSeveritylog, snackbarMessagelog },
    });
  };

  return (
    <>
      <div className="bg-customGreen h-screen overflow-hidden">
        <div className="shadow-md bg-white h-20 flex">
          <Header />
        </div>
        <div className="h-full flex flex-col items-center mt-36">
        <div className="relative pb-8 mb-2"> 
          <input
            className={`rounded h-12 w-96 ${
              errors.email
                ? "border-2 border-red-700"
                : "border-gray-300"
            }`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {clearErrors(email); setEmail(e.target.value)}}
            onKeyDown={handleEnterPress}
          />
          {errors.email && (
                  <span className="text-red-900 text-base absolute bottom-0 right-0 mb-2 mr-2">
                    {errors.email}
                  </span>
                )}
          </div>
            <div className="relative pb-8 mb-2">
          <input
            className={`rounded h-12 w-96 ${
              errors.password
                ? "border-2 border-red-700"
                : "border-gray-300"
            }`}
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => {clearErrors(password); setPassword(e.target.value)}}
            onKeyDown={handleEnterPress}
          />
          {errors.password && (
                  <span className="text-red-900 text-base absolute bottom-0 right-0 mb-2 mr-2">
                    {errors.password}
                  </span>
                )}
          </div>
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
      <Snackbar
        open={snackbarOpenlog}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpenlog(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpenlog(false)}
          severity={snackbarSeveritylog}
        >
          {snackbarMessagelog}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Login;
