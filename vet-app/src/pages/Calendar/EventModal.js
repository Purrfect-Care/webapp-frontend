import React, { useEffect, useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import * as Hi2Icons from "react-icons/hi2";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import { patientsSideBarRequest } from "../../api/patientsRequests";
import { visitTypesRequest } from "../../api/visitsRequests";
import { addVisitRequest } from "../../api/visitsRequests";
import { filteredVisitSubtypesRequest } from "../../api/visitsRequests";
import { employeesRequest } from "../../api/employeesRequests";

const labelsClasses = ["planned", "cancelled", "complete"];

function EventModal() {
  const { setShowEventModal, daySelected, dispatchCallEvent, selectedEvent } = useContext(GlobalContext);

  const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? selectedEvent.visit_status : labelsClasses[0]);
  const [visitDatetime, setVisitDatetime] = useState(selectedEvent ? selectedEvent.visit_datetime : "");
  const [visitDuration, setVisitDuration] = useState(selectedEvent ? selectedEvent.visit_duration : "");
  const [visitDescription, setVisitDescription] = useState(selectedEvent ? selectedEvent.visit_description : "");
  const [patientWeight, setPatientWeight] = useState(selectedEvent ? selectedEvent.patient_weight : "");
  const [patientHeight, setPatientHeight] = useState(selectedEvent ? selectedEvent.patient_height : "");
  const [visitsPatient, setVisitsPatient] = useState(selectedEvent ? selectedEvent.visits_patient_id : "");
  const [visitsVisitType, setVisitsVisitType] = useState(selectedEvent ? selectedEvent.visits_visit_type_id : "");
  const [visitsVisitSubtype, setVisitsVisitSubtype] = useState(selectedEvent ? selectedEvent.visits_visit_subtype_id : "");
  const [visitsEmployee, setVisitsEmployee] = useState(selectedEvent ? selectedEvent.visits_employee_id : "");

  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await patientsSideBarRequest();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  const [visitTypes, setVisitTypes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitTypesData = await visitTypesRequest();
        setVisitTypes(visitTypesData);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  const [visitSubtypes, setVisitSubtypes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (visitsVisitType != "") {
          const visitSubtypesData = await filteredVisitSubtypesRequest(visitsVisitType);
          setVisitSubtypes(visitSubtypesData);
        }
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, [visitsVisitType]);

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await employeesRequest();
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const calendarEvent = {
      visit_datetime: visitDatetime,
      visit_duration: visitDuration,
      visit_status: selectedLabel,
      visit_description: visitDescription,
      patient_weight: patientWeight,
      patient_height: patientHeight,
      visits_patient: visitsPatient,
      visits_visit_type: visitsVisitType,
      visits_visit_subtype: visitsVisitSubtype,
      visits_employee: visitsEmployee,
    };

    if (selectedEvent) {
      dispatchCallEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCallEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  const maxPatientNameLength = patients.reduce((max, patient) => {
    return Math.max(max, patient.patient_name.length);
  }, 0);

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center ">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-customGreen px-4 py-2 flex justify-between items-center">
          <Hi2Icons.HiBars2 className="text-white" />
          <div>
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCallEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
              >
                <AiIcons.AiOutlineDelete className="text-white mr-2" />
              </button>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <AiIcons.AiOutlineClose className="text-white" />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <label className="text-gray-600">Data i godzina</label>
            <input
              type="datetime-local"
              name="visitDatetime"
              value={visitDatetime}
              className="mt-1 block w-full border-2 border-gray-200 p-2 rounded-md"
              onChange={(e) => setVisitDatetime(e.target.value)}
            />

            <label className="text-gray-600">Czas trwania</label>
            <input
              type="time"
              name="visitDuration"
              value={visitDuration}
              className="mt-1 block w-full border-2 border-gray-200 p-2 rounded-md"
              onChange={(e) => setVisitDuration(e.target.value)}
            />
            {/* <label className="text-gray-600">Czas trwania</label>
            <div className="flex space-x-2">              
              <input
                type="number"
                name="visitDurationHours"
                // value={visitDurationHours}
                min="0"
                className="w-1/2 border-2 border-gray-200 p-2 rounded-md"
                // onChange={(e) => setVisitDurationHours(e.target.value)}
              />
              <span>hours</span>
              <input
                type="number"
                name="visitDurationMinutes"
                // value={visitDurationMinutes}
                min="0"
                max="59"
                className="w-1/2 border-2 border-gray-200 p-2 rounded-md"
                // onChange={(e) => setVisitDurationMinutes(e.target.value)}
              />
              <span>minutes</span>              
            </div> */}

            <label className="text-gray-600">Opis wizyty</label>
            <textarea
              name="visitDescription"
              value={visitDescription}
              onChange={(e) => setVisitDescription(e.target.value)}
              className="mt-1 block w-full border-2 border-gray-200 p-2 rounded-md"
              rows="4"
            />

            <label className="text-gray-600">Waga pacjenta</label>
            <input
              type="number"
              name="patientWeight"
              value={patientWeight}
              onChange={(e) => setPatientWeight(e.target.value)}
              className="mt-1 block w-full border-2 border-gray-200 p-2 rounded-md"
              step="any"
            />

            <label className="text-gray-600">Wzrost pacjenta</label>
            <input
              type="number"
              name="patientHeight"
              value={patientHeight}
              onChange={(e) => setPatientHeight(e.target.value)}
              className="mt-1 block w-full border-2 border-gray-200 p-2 rounded-md"
              step="any"
            />

            <label className="text-gray-600">Pacjent</label>
            <select
              name="visitsPatient"
              value={visitsPatient}
              onChange={(e) => setVisitsPatient(e.target.value)}
              className="mt-1 block w-full border-2 border-gray-200 p-2 rounded-md"
            >
              <option value="" disabled>
                Wybierz pacjenta
              </option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.patient_name}  • {patient.patients_owner.owner_first_name} {patient.patients_owner.owner_last_name} 
                </option>
              ))}
            </select>

            <label className="text-gray-600">Typ wizyty</label>
            <select
              name="visitsVisitType"
              value={visitsVisitType}
              onChange={(e) => {setVisitsVisitType(e.target.value);}}
              className="mt-1 block w-full border-2 border-gray-200 p-2 rounded-md"
            >
              <option value="" disabled>
                Wybierz typ wizyty
              </option>
              {visitTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.visit_type_name}
                </option>
              ))}
            </select>

            <label className="text-gray-600">Podtyp wizyty</label>
            <select
              name="visitsVisitSubtype"
              value={visitsVisitSubtype}
              onChange={(e) => {setVisitsVisitSubtype(e.target.value);}}
              className="mt-1 block w-full border-2 border-gray-200 p-2 rounded-md"
            >
              <option value="" disabled>
                Wybierz podtyp wizyty
              </option>
              {visitSubtypes.map((subtype) => (
                <option key={subtype.id} value={subtype.id}>
                  {subtype.visit_subtype_name}
                </option>
              ))}
            </select>

            <label className="text-gray-600">Pracownik</label>
            <select
              name="visitsEmployee"
              value={visitsEmployee}
              onChange={(e) => setVisitsEmployee(e.target.value)}
              className="mt-1 block w-full border-2 border-gray-200 p-2 rounded-md"
            >
              <option value="" disabled>
                Wybierz pracownika
              </option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.employee_first_name} {employee.employee_last_name}
                </option>
              ))}
            </select>

            <BiIcons.BiBookmark className="text-gray-400 text-2xl" />
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer border border-gray-400`}
                >
                  {selectedLabel === lblClass && (
                    // <AiIcons.AiOutlineCheck className="text-black text-sm" />
                    <span className="material-icons-outlined text-black text-sm">
                      {" "}
                      {selectedLabel}{" "}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-customGreen hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Zapisz
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
