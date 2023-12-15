import React, { useEffect, useMemo, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import {
  visitsByEmployeeIdRequest,
  visitsByEmployeeClinicIdRequest,
} from "../api/visitsRequest";

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [events, setEvents] = useState([]);
  const [updatePatientBar, setUpdatePatientBar] = useState(false);
  const [comesFromLogin, setComesFromLogin] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showCalendarSidebar, setShowCalendarSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.visit_status)
    );
  }, [events, labels]);

  async function fetchEvents() {
    try {
      const employeeData = JSON.parse(localStorage.getItem("employeeData"));
      if (employeeData) {
        // Check if employeeData exists
        setIsLoggedIn(true); // Set isLoggedIn to true
        if (employeeData.employee_role.toString() === "Administrator") {
          const eventsData = await visitsByEmployeeClinicIdRequest(
            employeeData.employees_clinic_id.toString()
          );
          setEvents(eventsData);
        } else {
          const eventsData = await visitsByEmployeeIdRequest(
            employeeData.id.toString()
          );
          setEvents(eventsData);
        }
      } else {
        console.log("No employee data found");
        setIsLoggedIn(false); // Set isLoggedIn to false
      }
    } catch (error) {
      console.error("Error fetching events from the server:", error);
    }
  }

  useEffect(() => {fetchEvents();}, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [isLoggedIn]);

  const updateEvent = async () => {
    try {
      const employeeData = JSON.parse(localStorage.getItem("employeeData"));
      if (employeeData.employee_role.toString() === "Administrator") {
        const eventsData = await visitsByEmployeeClinicIdRequest(
          employeeData.employees_clinic_id.toString()
        );
        setEvents(eventsData);
      } else {
        const eventsData = await visitsByEmployeeIdRequest(
          employeeData.id.toString()
        );
        setEvents(eventsData);
      }
    } catch (error) {
      console.error("Error fetching events from the server:", error);
    }
  };
  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(events.map((evt) => evt.visit_status))].map(
        (label) => {
          const currentLabel = prevLabels.find((lbl) => lbl.label === label);
          return { label, checked: currentLabel ? currentLabel.checked : true };
        }
      );
    });
  }, [events]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        setSmallCalendarMonth,
        smallCalendarMonth,
        setDaySelected,
        daySelected,
        showEventModal,
        setShowEventModal,
        selectedEvent,
        setSelectedEvent,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        updateEvent,
        updatePatientBar,
        setUpdatePatientBar,
        setComesFromLogin,
        comesFromLogin,
        loggingOut,
        setLoggingOut,
        showCalendarSidebar,
        setShowCalendarSidebar,
        setEvents,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
