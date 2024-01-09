import React, { useEffect, useMemo, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
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
  const [vets, setVets] = useState([]);
  const [events, setEvents] = useState([]);
  const [updatePatientBar, setUpdatePatientBar] = useState(false);
  const [comesFromLogin, setComesFromLogin] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showCalendarSidebar, setShowCalendarSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectAll, setSelectAll] = useState(true);

  const filteredEvents = useMemo(() => {
    return events.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.visit_status) &&
      vets
        .filter((vet) => vet.checked)
        .map((vet) => vet.id)
        .includes(evt.visits_employee.id)
    );
  }, [events, labels, vets]);



  async function fetchEvents() {
    try {
      let authToken = localStorage.getItem('authToken');

      // Check if authToken is empty, create a mock token if necessary
      if (!authToken) {
        const mockTokenValue = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1wbG95ZWVfcm9sZSI6IldldGVyeW5hcnoiLCJlbXBsb3llZV9maXJzdF9uYW1lIjoiS29uc3RhbnR5IiwiZW1wbG95ZWVfbGFzdF9uYW1lIjoiTWFydXN6Y3p5ayIsImVtcGxveWVlc19jbGluaWNfaWQiOjIsImV4cCI6MTcwNDU3NzQ1MC40NzI3NzN9.1z6ODJLIpxqaIKFxYR7xFAyQCiuDryrIbzDARQUauCU";
        authToken = mockTokenValue;
      }
      const employeeData = jwtDecode(authToken);
      if (employeeData) {
        // Check if employeeData exists
        setIsLoggedIn(true); // Set isLoggedIn to true
        if (employeeData.employee_role.toString() === "Administrator" || employeeData.employee_role.toString() === "SuperAdmin" ) {
          if (employeeData.employees_clinic_id.toString() != ""){

            const eventsData = await visitsByEmployeeClinicIdRequest(
              employeeData.employees_clinic_id.toString()
            );
            setEvents(eventsData);
          }
        }
        
        else {
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

  useEffect(() => { fetchEvents(); }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [isLoggedIn]);

  const updateEvent = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      let employeeData;

      try {
        employeeData = jwtDecode(authToken);
      } catch (error) {
        // Handle the case where decoding fails (invalid token)
        console.error('Error decoding token:', error.message);
        return <Navigate to="/login" replace />;
      }
      if (employeeData.employee_role.toString() === "Administrator" || employeeData.employee_role.toString() === "SuperAdmin") {
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
    setVets((prevVets) => {
      const uniqueVetsMap = events.reduce((acc, evt) => {
        acc[evt.visits_employee.id] = evt.visits_employee;
        return acc;
      }, {});
      const uniqueVets = Object.values(uniqueVetsMap);
      return uniqueVets.map((selectedVet) => {
        const currentVet = prevVets.find((vet) => vet.id === selectedVet.id);
        return {
          id: selectedVet.id,
          firstName: selectedVet.employee_first_name,
          lastName: selectedVet.employee_last_name,
          checked: currentVet ? currentVet.checked : true
        };
      });
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

  function updateVets(updatedVet) {
    setVets((prevVets) => {
      const updatedVets = prevVets.map((vet) => (vet.id === updatedVet.id ? updatedVet : vet));
      setSelectAll(updatedVets.every((vet) => vet.checked));
      return updatedVets;
    });
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
        setVets,
        vets,
        updateVets,
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
        setSelectAll,
        selectAll,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
