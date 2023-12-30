import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarSidebar from "./CalendarSidebar";
import Month from "./Month";
import { getMonth } from "../../util";
import GlobalContext from "../../context/GlobalContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import EventModal from "./EventModal";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, comesFromLogin, setComesFromLogin, showCalendarSidebar } = useContext(GlobalContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
      if (comesFromLogin) {
        openSnackbarLog("success", "Zalogowano pomyślnie!");
        setComesFromLogin(false); 
      }
  }, [monthIndex, comesFromLogin]);

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const openSnackbarLog = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };


  return (
    <>
      <React.Fragment>
        {showEventModal && <EventModal snackbar = {openSnackbar}/>}
        <Sidebar />
        <div className="h-screen flex flex-col shadow-inner ml-[-5px] mt-[8px] py-[12px] px-[24px] bg-white rounded-lg ">
          <CalendarHeader />
          <div className="flex flex-1">
            {showCalendarSidebar && <CalendarSidebar />}
            <Month month={currentMonth} />
          </div>
        </div>
        
      </React.Fragment>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default CalendarPage;
