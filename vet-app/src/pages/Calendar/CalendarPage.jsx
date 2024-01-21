import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarSidebar from "./CalendarSidebar";
import Month from "./Month";
import { getMonth, getWeek } from "../../util";
import GlobalContext from "../../context/GlobalContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import EventModal from "./EventModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CalendarHeaderWeek from "./CalendarHeaderWeek";
import Week from "./Week";

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {
    monthIndex,
    showEventModal,
    comesFromLogin,
    setComesFromLogin,
    showCalendarSidebar,
    monthSelected,
    daySelected,
  } = useContext(GlobalContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentWeek, setCurrentWeek] = useState(getMonth(monthIndex));

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
    setCurrentWeek(getWeek(monthIndex));
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
        {showEventModal && <EventModal snackbar={openSnackbar} />}
        <Sidebar className="ml-8" />
        <div className="h-screen flex flex-col shadow-inner ml-[-5px] mt-[8px] py-[12px] px-[24px] bg-white rounded-lg ">
          {monthSelected && <CalendarHeader />}
          {!monthSelected && <CalendarHeaderWeek />}
          <div className="flex flex-1">
            {showCalendarSidebar && monthSelected && <CalendarSidebar />}
            {!monthSelected && <CalendarSidebar />}

            {monthSelected && <Month month={currentMonth} />}
            {!monthSelected && <Week month={currentMonth} day={daySelected} />}
          </div>
        </div>
      </React.Fragment>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
