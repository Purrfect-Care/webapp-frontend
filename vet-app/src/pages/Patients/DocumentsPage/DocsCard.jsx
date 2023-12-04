import React, {useState} from "react";
import "./DocsCard.css";
import * as AiIcons from "react-icons/ai";
import ViewPrescriptionForm from "../../../PrescriptionForm/ViewPrescriptionForm";

const DocsCard = ({ prescId, medications, date, onDelete, employee, patient }) => {
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  
  const cardHeight = 100 + medications.length * 40;

  const handleDelete = () => {
    onDelete(prescId);
  };
  const handleViewPrescription = () => {
    setShowPrescriptionForm(true);
  };

  return (
    <div className="docsCard" style={{ height: `${cardHeight}px` }}>
      <table>
        <thead>
          <tr>
            <th>Nazwa leku</th>
            <th>Przepisana ilość</th>
            <th>Data przepisania leku</th>
            <th className="icons-docs">
              <AiIcons.AiOutlineDelete className="deleteIcon" onClick={handleDelete} />
              <AiIcons.AiOutlineFilePdf onClick={handleViewPrescription} />
            </th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication.id}>
              <td>{medication.medication_name.medication_name}</td>
              <td>{medication.medication_amount}</td>
              <td>{date}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPrescriptionForm && (
        <ViewPrescriptionForm
          onClose={() => setShowPrescriptionForm(false)}
          prescriptionDetails={{ prescription_date: date, prescribed_medications: medications, employee: employee, patient: patient }}
        />
      )}
    </div>
  );
};

export default DocsCard;
