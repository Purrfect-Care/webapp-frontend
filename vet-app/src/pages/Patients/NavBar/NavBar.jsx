import React, { useState } from "react";
import "./NavBar.css";
import VisitForm from "../../../pages/VisitForm/VisitForm";
import { createVisitRequest } from "../../../api/visitsRequest";
import { NavBarData } from "./NavBarData";
import { Link } from "react-router-dom";
import PrescriptionForm from "../../../PrescriptionForm/PrescriptionForm";
import dayjs from "dayjs";


const NavBar = ({ id, onSelectOption }) => {
  const [selectedTab, setSelectedTab] = useState(NavBarData[1].title); 
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const handleCreateVisit = () => {
    setShowVisitForm(true);
  };

  const handleCloseVisitForm = () => {
    setShowVisitForm(false);
  };

  const submitForm = async (formData) => {
    try {
      console.log("Form Data:", formData);

      await createVisitRequest(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    handleCloseVisitForm();
  };

  const handleCreatePrescription = () => {
    setShowPrescriptionForm(true);
  };

  const handleClosePrescriptionForm = () => {
    setShowPrescriptionForm(false);
  };

  const isWizytyTab = selectedTab === 'WIZYTY';

  const isDokumentacjaTab = selectedTab === 'DOKUMENTACJA';

  return (
    <div className="navBar">
      {NavBarData.map((item, index) => {
        return (
          <li key={index} className={item.className}>
            <Link
              to={`/patients/${id}${item.path}`}
              onClick={() => {
                onSelectOption(item.title);
                setSelectedTab(item.title);
              }}
              className={selectedTab === item.title ? 'active' : ''}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
      {showVisitForm && (
        <>
          <VisitForm
            onClose={handleCloseVisitForm}
            onSubmit={submitForm}
            initialValues={{
              visits_patient_id: id,
              visit_datetime: dayjs(),
              visits_employee_id: JSON.parse(
                localStorage.getItem("employeeData")
              ).id.toString(),
            }}
            editOnly={true}
            setEdit={showVisitForm}
          />
        </>
      )}
      {showPrescriptionForm && (
        <>
          <PrescriptionForm
            onClose={handleClosePrescriptionForm}
            initialPrescriptionValues={{
              prescriptions_patient_id: id
            }}
          />
        </>
      )}
      {isWizytyTab && <button onClick={handleCreateVisit} className="create_visit">Utwórz Wizytę</button>}
      {isDokumentacjaTab && <button onClick={handleCreatePrescription} className="create_visit">Utwórz Receptę</button>}

    </div>
  );
};

export default NavBar;
