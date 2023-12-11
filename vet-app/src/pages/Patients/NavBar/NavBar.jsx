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

  const [showIllnessHistoryForm, setShowIllnessHistoryForm] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const handleIllnessHistoryForm = () => {
    setShowIllnessHistoryForm(true);
  };

  const handleCloseIllnessHistoryForm = () => {
    setShowIllnessHistoryForm(false);
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
      {showIllnessHistoryForm && (
        <>
          <IllnessHistoryForm
          isOpen={showIllnessHistoryForm}
          onClose={handleCloseIllnessHistoryForm}
          initialValues={{
            illness_history_patient_id: id,
          }}
          onSubmit={submitIllnessForm}
        />
        </>
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
