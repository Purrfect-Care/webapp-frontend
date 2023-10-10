import { Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Prescription from './pages/Prescription';
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <>
    <div className="app-container">
      <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/prescription" element={<Prescription/>} />
            <Route path="/calendar" element={<CalendarPage/>} />
          </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
