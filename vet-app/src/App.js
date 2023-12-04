import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Prescription from './pages/Prescription/Prescription';
import CalendarPage from './pages/Calendar/CalendarPage';
import PatientsPage from './pages/Patients/PatientsPage';
import VisitTypePage from './pages/VisitType/VisitType';
import Login from './pages/Login/Login';
import SignIn from './pages/SignIn/SignIn';
import AddClinic from './pages/AddClinic/AddClinic';
import AutoLogout from './api/AutoLogout';
import PatientForm from './pages/PatientForm/PatientForm';

const isAuthenticated = () => {
  // Implement your logic to check if the user is authenticated
  // For example, check if the authentication token exists in local storage
  return localStorage.getItem('authToken') !== null;
};

const CustomRoute = ({ element, path }) => {
  if (path === '/login' || path === '/sign-in' || path === '/add-clinic' || path === '/') {
    // For public routes, redirect to home if the user is authenticated
    return isAuthenticated() ? <Navigate to="/calendar" replace /> : element;
  } else {
    // For private routes, redirect to login if the user is not authenticated
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
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
            element={<CustomRoute element={<Prescription />} path="/prescription" />}
          />
          <Route
            path="/calendar"
            element={<CustomRoute element={<CalendarPage />} path="/calendar" />}
          />
          <Route
            path="/patients"
            element={<CustomRoute element={<PatientsPage />} path="/patients" />}
          />
          <Route
            path="/visits"
            element={<CustomRoute element={<VisitTypePage />} path="/visits" />}
          />
          <Route
            path="/patients/:id"
            element={<CustomRoute element={<PatientsPage />} path="/patients/:id" />}
          />
          <Route
            path="/visit_type"
            element={<CustomRoute element={<VisitTypePage />} path="/visit_type" />}
          />
          <Route
            path="/patients/:id/*"
            element={<CustomRoute element={<PatientsPage />} path="/patients/:id/*" />}
          />
          <Route
            path="/add-clinic"
            element={<CustomRoute element={<AddClinic />} path="/add-clinic" />}
          />
          <Route
            path="/add-patient"
            element={<CustomRoute element={<PatientForm />} path="/add-patient" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
