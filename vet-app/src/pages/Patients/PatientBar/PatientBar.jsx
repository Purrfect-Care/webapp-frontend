import React from "react";
import "./PatientBar.css";
import PatientRow from "../PatientRow/PatientRow";

const PatientBar = () => {
  return (
    <div className="patientBar">
      <PatientRow name="Michael" surname="Smith" puppyName="Rusty" />
      <PatientRow name="Alice" surname="Johnson" puppyName="Fido" />
      <PatientRow name="John" surname="Doe" puppyName="Buddy" />
      <PatientRow name="Michael" surname="Smith" puppyName="Rusty" />
      <PatientRow name="Alice" surname="Johnson" puppyName="Fido" />
      <PatientRow name="John" surname="Doe" puppyName="Buddy" />
      <PatientRow name="Michael" surname="Smith" puppyName="Rusty" />
      <PatientRow name="Alice" surname="Johnson" puppyName="Fido" />
      <PatientRow name="John" surname="Doe" puppyName="Buddy" />
      <PatientRow name="Michael" surname="Smith" puppyName="Rusty" />
      <PatientRow name="Alice" surname="Johnson" puppyName="Fido" />
      <PatientRow name="John" surname="Doe" puppyName="Buddy" />
    </div>
  );
};

export default PatientBar;
