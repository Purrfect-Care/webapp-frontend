import React, { useState } from "react";
import "./NavBar.css";
import { NavBarData } from "./NavBarData";
import { Link } from "react-router-dom";
import VisitForm from '../../../pages/VisitForm/VisitForm';
import { createVisitRequest } from '../../../api/visitsRequest';
import dayjs from 'dayjs';

const NavBar = ({ id, onSelectOption }) => {
  const [selectedTab, setSelectedTab] = useState(NavBarData[0].title); // Set default tab

  const [showVisitForm, setShowVisitForm] = useState(false);

  const handleCreateVisit = () => {
    setShowVisitForm(true);
  };

  const handleCloseVisitForm = () => {
    setShowVisitForm(false);
  };

  const submitForm = async (formData) => {
    try {
      console.log('Form Data:', formData);

      // Use createVisitRequest function to create a new visit
      await createVisitRequest(formData);

      // Optionally, you may want to update the state or perform additional actions
      // For example, refetch the updated visits after submitting
      // const updatedVisits = await visitsRequest(patient.id);
      // setVisits(updatedVisits);
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    // Close the form
    handleCloseVisitForm();
  };

  const isWizytyTab = selectedTab === 'WIZYTY';

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
              visits_employee_id: JSON.parse(localStorage.getItem('employeeData')).id.toString(),
            }}
            editOnly={true}
            setEdit={showVisitForm}
          />
        </>
      )}
      {isWizytyTab && <button onClick={handleCreateVisit} className="create_visit">Utwórz Wizytę</button>}
    </div>
  );
};

export default NavBar;
