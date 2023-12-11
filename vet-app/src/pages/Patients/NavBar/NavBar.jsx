import React, { useState, useEffect } from "react";
import "./NavBar.css";
import VisitForm from "../../../pages/VisitForm/VisitForm";
import { createVisitRequest } from "../../../api/visitsRequest";
import { NavBarData } from "./NavBarData";
import { Link } from "react-router-dom";
import PrescriptionForm from "../../../PrescriptionForm/PrescriptionForm";
import dayjs from "dayjs";
import IllnessHistoryForm from "../../IllnessHistoryForm/IllnessHistoryForm";
import { createIllnessHistoryRequest } from "../../../api/illnessHistoryRequests";

const NavBar = ({ id, onSelectOption, selectedTab }) => {

  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showIllnessHistoryForm, setShowIllnessHistoryForm] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const handleCreateVisit = () => {
    setShowVisitForm(true);
  };

  const handleCloseVisitForm = () => {
    setShowVisitForm(false);
  };

  const handleIllnessHistoryForm = () => {
    setShowIllnessHistoryForm(true);
  };

  const handleCloseIllnessHistoryForm = () => {
    setShowIllnessHistoryForm(false);
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

  const submitIllnessForm = async (formData) => {
    try {
      console.log("Form Data:", formData);

      await createIllnessHistoryRequest(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    handleCloseIllnessHistoryForm();
  };

  const handleCreatePrescription = () => {
    setShowPrescriptionForm(true);
  };

  const handleClosePrescriptionForm = () => {
    setShowPrescriptionForm(false);
  };

  const isWizytyTab = selectedTab === "WIZYTY";
  const isChorobyTab = selectedTab === "HISTORIA CHORÓB";
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
                
              }}
              className={selectedTab === item.title ? "active" : ""}
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
      {showIllnessHistoryForm && (
        <>
          <IllnessHistoryForm
          isOpen={showIllnessHistoryForm}
          onClose={handleCloseIllnessHistoryForm}
          initialValues={{
            illness_history_patient_id: id,
            illness_onset_date: dayjs().format('YYYY-MM-DD')
          }}
          onSubmit={submitIllnessForm}
        />
        </>
      )}
      {isWizytyTab && (
        <button onClick={handleCreateVisit} className="create_visit">
          Utwórz Wizytę
        </button>
      )}
      {isChorobyTab && (
        <button onClick={handleIllnessHistoryForm} className="create_visit">
          Przypisz chorobę
        </button>
      )}
      {isDokumentacjaTab && <button onClick={handleCreatePrescription} className="create_visit">Utwórz Receptę</button>}
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

    </div>
  );
};

export default NavBar;
