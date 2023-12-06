import React, { useState } from "react";
import "./NavBar.css";
import VisitForm from "../../../pages/VisitForm/VisitForm";
import { createVisitRequest } from "../../../api/visitsRequest";
import { NavBarData } from "./NavBarData";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import IllnessHistoryForm from "../../IllnessHistoryForm/IllnessHistoryForm";
import { createIllnessHistoryRequest } from "../../../api/illnessHistoryRequests";

const NavBar = ({ id, onSelectOption }) => {
  const [selectedTab, setSelectedTab] = useState(NavBarData[1].title);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showIllnessHistoryForm, setShowIllnessHistoryForm] = useState(false);

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

  const isWizytyTab = selectedTab === "WIZYTY";
  const isChorobyTab = selectedTab === "HISTORIA CHORÓB";

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
    </div>
  );
};

export default NavBar;
