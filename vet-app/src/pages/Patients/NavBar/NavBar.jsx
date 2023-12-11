import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { NavBarData } from "./NavBarData";
import { Link } from "react-router-dom";
import PrescriptionForm from "../../../PrescriptionForm/PrescriptionForm";
import IllnessHistoryForm from "../../IllnessHistoryForm/IllnessHistoryForm";
import { createIllnessHistoryRequest } from "../../../api/illnessHistoryRequests";

const NavBar = ({ id, onSelectOption, selectedTab }) => {
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const handleCreatePrescription = () => {
    setShowPrescriptionForm(true);
  };

  const handleClosePrescriptionForm = () => {
    setShowPrescriptionForm(false);
  };

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
