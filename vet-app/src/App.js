import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Prescription from "./pages/Prescription/Prescription";
import CalendarPage from "./pages/Calendar/CalendarPage";
import PatientsPage from "./pages/Patients/PatientsPage";
import VisitTypePage from "./pages/VisitType/VisitType";
import Login from "./pages/Login/Login";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/prescription" element={<Prescription/>} />
            <Route path="/calendar" element={<CalendarPage/>} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/visits" element={<VisitTypePage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/patients/:id" element={<PatientsPage />} />
            <Route path="/visit_type" element={<VisitTypePage />} />
            <Route path="/patients/:id/*" element={<PatientsPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
