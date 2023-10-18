import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Prescription from './pages/Prescription/Prescription';
import CalendarPage from './pages/Calendar/CalendarPage';
import PatientsPage from "./pages/Patients/PatientsPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/visits" element={<Home/>} />
            <Route path="/prescription" element={<Prescription/>} />
            <Route path="/calendar" element={<CalendarPage/>} />
            <Route path="/patients" element={<PatientsPage />} />
          </Routes>
          
      </BrowserRouter>
    </div>
  );
}

export default App;
