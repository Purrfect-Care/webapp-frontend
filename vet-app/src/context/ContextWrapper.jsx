import React, { useEffect, useMemo, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import {
  visitsByEmployeeIdRequest,
  visitsByEmployeeClinicIdRequest,
} from "../api/visitsRequest";
import { employeesByRole } from "../api/employeesRequest";

export default function ContextWrapper(props) {
  dayjs.extend(weekOfYear);
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
  const [showCalendarSidebar, setShowCalendarSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [monthSelected, setMonthSelected] = useState(true);
  const [weekIndex, setWeekIndex] = useState(dayjs().week());
  const [selectedVet, setSelectedVet] = useState(null);

  const filteredEvents = useMemo(() => {
    let isVet = false;

    try {
      let authToken = localStorage.getItem('authToken');

      if (!authToken) {
        // Handle the case where the token is missing
        console.error('No authToken found.');
        setIsLoggedIn(false); // Set isLoggedIn to false
        return;
      }

      const employeeData = jwtDecode(authToken);
      if (employeeData.employee_role.toString() === "Weterynarz") { 
        isVet = true;
      }
    }
    catch (error) {
      console.error("Error fetching employee data from the server:", error);
    }
     
    if(!isVet){
      console.log('Events:', events);
  console.log('Labels:', labels);
  console.log('Vets:', vets);
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
      
    }
    else {
      return events.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.visit_status)
      )
    }
  }, [events, labels, vets]);

  async function fetchEvents() {
    try {
      let authToken = localStorage.getItem('authToken');

      if (!authToken) {
        // Handle the case where the token is missing
        console.error('No authToken found.');
        setIsLoggedIn(false); // Set isLoggedIn to false
        return;
      }
      const employeeData = jwtDecode(authToken);
      if (employeeData) {
        // Check if employeeData exists
        setIsLoggedIn(true); // Set isLoggedIn to true
        if (employeeData.employee_role.toString() === "Administrator" || employeeData.employee_role.toString() === "SuperAdmin" ) {
          if (!selectedVet) {
            fetchVets();
          }
          const eventsData = await visitsByEmployeeIdRequest(selectedVet);
          console.log("selectedVet", selectedVet);
          console.log("eventsData", eventsData);
          
          setEvents(eventsData);
        }          
        else {
          const eventsData = await visitsByEmployeeIdRequest(employeeData.id);
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

  useEffect(() => {
    console.log("selectedVet", selectedVet);
    if (selectedVet) {      
      fetchEvents(selectedVet);
    }
  }, [selectedVet]);

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
      if (employeeData.employee_role.toString() === "Administrator" || employeeData.employee_role.toString() === "SuperAdmin" ) {
        const eventsData = await visitsByEmployeeIdRequest(selectedVet);
        setEvents(eventsData);
      }          
      else {
        const eventsData = await visitsByEmployeeIdRequest(employeeData.id);
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

  async function fetchVets() {
    try {
      let authToken = localStorage.getItem('authToken');

      if (!authToken) {
        // Handle the case where the token is missing
        console.error('No authToken found.');
        setIsLoggedIn(false); // Set isLoggedIn to false
        return;
      }

      const employeeData = jwtDecode(authToken);
      if (employeeData && employeeData.employees_clinic_id !== "") {
        const uniqueVetsMap = await employeesByRole("Weterynarz", employeeData.employees_clinic_id);
        setVets((prevVets) => {
          const uniqueVets = Object.values(uniqueVetsMap);
          // If there are vets and selectedVet is still null
          if (uniqueVets.length > 0 && selectedVet === null) {
            const firstVet = uniqueVets[0];
            setSelectedVet(firstVet.id); // Set the selectedVet to the ID of the first vet
          }
        
          return uniqueVets.map((vet) => {
            const currentVet = prevVets.find((prevVet) => prevVet.id === vet.id);
            return {
              id: vet.id,
              firstName: vet.employee_first_name,
              lastName: vet.employee_last_name,
              // Set checked to true only for the vet whose id matches selectedVet
              checked: vet.id === selectedVet ? true : currentVet ? currentVet.checked : false,
            };
          });
        });
        
      }
    }
    catch (error) {
      console.error("Error fetching employees from the server:", error);
    }
  }

  useEffect(() => {
    
    fetchVets();
  }, [events, selectedVet]);
  
  async function fetchVetsForSuperadmin(clinicId) {
    try {
      let authToken = localStorage.getItem('authToken');

      if (!authToken) {
        // Handle the case where the token is missing
        console.error('No authToken found.');
        setIsLoggedIn(false); // Set isLoggedIn to false
        return;
      }

      const employeeData = jwtDecode(authToken);
      if (employeeData) {
        const uniqueVetsMap = await employeesByRole("Weterynarz", clinicId);
        setVets((prevVets) => {
          const uniqueVets = Object.values(uniqueVetsMap);
          // If there are vets and selectedVet is still null
          if (uniqueVets.length > 0) {
            const firstVet = uniqueVets[0];
            setSelectedVet(firstVet.id); // Set the selectedVet to the ID of the first vet
          }
        
          return uniqueVets.map((vet) => {
            const currentVet = prevVets.find((prevVet) => prevVet.id === vet.id);
            return {
              id: vet.id,
              firstName: vet.employee_first_name,
              lastName: vet.employee_last_name,
              // Set checked to true only for the vet whose id matches selectedVet
              checked: vet.id === selectedVet ? true : currentVet ? currentVet.checked : false,
            };
          });
        });
        
      }
    }
    catch (error) {
      console.error("Error fetching employees from the server:", error);
    }
  }

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
        setMonthSelected,
        monthSelected,
        setWeekIndex,
        weekIndex,
        setSelectedVet,
        selectedVet,
        fetchVetsForSuperadmin,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
