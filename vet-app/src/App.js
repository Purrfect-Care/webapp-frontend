import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import CalendarPage from "./pages/Calendar/CalendarPage";
import PatientsPage from "./pages/Patients/PatientsPage";
import VisitTypePage from "./pages/VisitType/VisitType";
import Login from "./pages/Login/Login";
import SignIn from "./pages/AddPage/SignIn/SignIn";
import AddClinic from "./pages/AddPage/AddClinic/AddClinic";
import AutoLogout from "./api/AutoLogout";
import CreatePrescription from "./pages/CreatePrescription/CreatePrescription";
import AddPage from "./pages/AddPage/AddPage";
import AddMedications from "./pages/AddPage/AddMedications";
import AddVisitType from "./pages/AddPage/AddVisitType";
import AddVisitSubtype from "./pages/AddPage/AddVisitSubtype";
import PatientForm from "./pages/AddPage/PatientForm/PatientForm";
import AddOwner from "./pages/AddPage/AddOwner/AddOwner";
import AddIllness from "./pages/AddPage/AddIllness";
import AddSpecies from "./pages/AddPage/AddSpecies";
import AddBreed from "./pages/AddPage/AddBreed";
import ShowPage from "./pages/ShowPage/ShowPage";
import ShowPatientComponent from "./pages/ShowPage/ShowPatients/ShowPatientComponent";
import ShowOwnerComponent from "./pages/ShowPage/ShowOwners/ShowOwnerComponent";
import ShowIllnessComponent from "./pages/ShowPage/ShowIllness/ShowIllnessComponent";
import ShowSpecieComponent from "./pages/ShowPage/ShowSpecie/ShowSpecieComponent";
import ShowEmployeeComponent from "./pages/ShowPage/ShowEmployee/ShowEmployeeComponent";
import ShowBreedComponent from "./pages/ShowPage/ShowBreed/ShowBreedComponent";
import ShowMedicationComponent from "./pages/ShowPage/ShowMedication/ShowMedicationComponent";
import ShowVisitTypeComponent from "./pages/ShowPage/ShowVisitType/ShowVisitTypeComponent";
import ShowVisitSubtypeComponent from "./pages/ShowPage/ShowVisitSubtypes/ShowVisitSubtypesComponent";
import SuperadminPage from "./pages/SuperadminPage/SuperadminPage";

const isAuthenticated = () => {
  // Implement your logic to check if the user is authenticated
  // For example, check if the authentication token exists in local storage
  return localStorage.getItem("authToken") !== null;
};

const CustomRoute = ({ element, path }) => {
  const employeeData = JSON.parse(localStorage.getItem("employeeData"));
  const isAdministrator = employeeData?.employee_role === "Administrator";
  const isSuperadmin = employeeData?.employee_role === "superadmin";

  const allowedPathsSuperadmin = [
    "/show-patient",
    "/show-owner",
    "/show-employee",
    "/show-medication",
    "/show-illness",
    "/show-visit-type",
    "/show-visit-subtype",
    "/show-species",
    "/show-breed",
    "/add-patient",
    "/add-owner",
    "/sign-in",
    "/add-medication",
    "/add-illness",
    "/add-visit-type",
    "/add-visit-subtype",
    "/add-species",
    "/add-breed",
    "/add",
    "/show",
    "/superadmin",
  ];

  if (path === "/login" || path === "/") {
    return isAuthenticated() ? <Navigate to="/calendar" replace /> : element;
  } else if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  } else if (isSuperadmin && !allowedPathsSuperadmin.includes(path)) {
    // Redirect away if the user is superadmin and trying to access a restricted path
    return <Navigate to="/superadmin" replace />;
  } else if (
    !isAdministrator &&
    (path === "/add" ||
      path === "/sign-in" ||
      path === "/add-clinic" ||
      path === "/add-visit-type" ||
      path === "/add-visit-subtype" ||
      path === "/add-medication" ||
      path === "/add-species" ||
      path === "/add-breed" ||
      path === "/add-patient" ||
      path === "/add-owner" ||
      path === "/add-medication" ||
      path === "/add-illness")
  ) {
    return <Navigate to="/calendar" replace />;
  } else if (isAdministrator && (path === "/superadmin")) {
    // Redirect away if the user is superadmin and trying to access a restricted path
    return <Navigate to="/calendar" replace />;
  } else {
    return element;
  }
};


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AutoLogout />
        <Routes>
          <Route
            path="/"
            element={<CustomRoute element={<Home />} path="/" />}
          />
          <Route
            path="/login"
            element={<CustomRoute element={<Login />} path="/login" />}
          />
          <Route
            path="/sign-in"
            element={<CustomRoute element={<SignIn />} path="/sign-in" />}
          />
          <Route
            path="/prescription"
            element={
              <CustomRoute
                element={<CreatePrescription />}
                path="/prescription"
              />
            }
          />
          <Route
            path="/calendar"
            element={
              <CustomRoute element={<CalendarPage />} path="/calendar" />
            }
          />
          <Route
            path="/patients"
            element={
              <CustomRoute element={<PatientsPage />} path="/patients" />
            }
          />
          <Route
            path="/visits"
            element={<CustomRoute element={<VisitTypePage />} path="/visits" />}
          />
          <Route
            path="/patients/:id"
            element={
              <CustomRoute element={<PatientsPage />} path="/patients/:id" />
            }
          />
          <Route
            path="/visit_type"
            element={
              <CustomRoute element={<VisitTypePage />} path="/visit_type" />
            }
          />
          <Route
            path="/patients/:id/*"
            element={
              <CustomRoute element={<PatientsPage />} path="/patients/:id/*" />
            }
          />
          <Route
            path="/add"
            element={<CustomRoute element={<AddPage />} path="/add" />}
          />
          <Route
            path="/add-clinic"
            element={<CustomRoute element={<AddClinic />} path="/add-clinic" />}
          />
          <Route
            path="/add-visit-type"
            element={
              <CustomRoute element={<AddVisitType />} path="/add-visit-type" />
            }
          />
          <Route
            path="/add-visit-subtype"
            element={
              <CustomRoute
                element={<AddVisitSubtype />}
                path="/add-visit-subtype"
              />
            }
          />
          <Route
            path="/add-medication"
            element={
              <CustomRoute
                element={<AddMedications />}
                path="/add-medication"
              />
            }
          />
          <Route
            path="/add-illness"
            element={
              <CustomRoute element={<AddIllness />} path="/add-illness" />
            }
          />
          <Route
            path="/add-patient"
            element={
              <CustomRoute element={<PatientForm />} path="/add-patient" />
            }
          />
          <Route
            path="/add-owner"
            element={<CustomRoute element={<AddOwner />} path="/add-owner" />}
          />
          <Route
            path="/add-species"
            element={
              <CustomRoute element={<AddSpecies />} path="/add-species" />
            }
          />
          <Route
            path="/add-breed"
            element={<CustomRoute element={<AddBreed />} path="/add-breed" />}
          />
          <Route
            path="/show"
            element={<CustomRoute element={<ShowPage/>} path="/show" />}
          />
          <Route
            path="/show-patient"
            element={
              <CustomRoute element={<ShowPatientComponent />} path="/show-patient" />
            }
          />
        <Route
            path="/show-owner"
            element={
              <CustomRoute element={<ShowOwnerComponent />} path="/show-owner" />
            }
          />
          <Route
            path="/show-illness"
            element={
              <CustomRoute element={<ShowIllnessComponent />} path="/show-illness" />
            }
          />
          <Route
            path="/show-species"
            element={
              <CustomRoute element={<ShowSpecieComponent />} path="/show-species" />
            }
          />
          <Route
            path="/show-breed"
            element={
              <CustomRoute element={<ShowBreedComponent />} path="/show-breed" />
            }
          />
          <Route
            path="/show-medication"
            element={
              <CustomRoute element={<ShowMedicationComponent />} path="/show-medication" />
            }
          />
          <Route
            path="/show-visit-type"
            element={
              <CustomRoute element={<ShowVisitTypeComponent />} path="/show-visit-type" />
            }
          />
          <Route
            path="/show-visit-subtype"
            element={
              <CustomRoute element={<ShowVisitSubtypeComponent />} path="/show-visit-subtype" />
            }
          />
          <Route
            path="/show-employee"
            element={
              <CustomRoute element={<ShowEmployeeComponent />} path="/show-employee" />
            }
          />
          <Route
            path="/superadmin"
            element={
              <CustomRoute element={<SuperadminPage />} path="/superadmin" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
