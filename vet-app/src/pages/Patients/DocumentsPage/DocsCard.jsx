import React from "react";
import "./DocsCard.css";
import * as AiIcons from "react-icons/ai";

const DocsCard = ({ prescId, medications, date, onDelete }) => {
  const cardHeight = 100 + medications.length * 40;

  const handleDelete = () => {
    onDelete(prescId);
  };

  return (
    <div className="docsCard" style={{ height: `${cardHeight}px` }}>
      <table>
        <thead>
          <tr>
            <th>Nazwa leku</th>
            <th>Przepisana ilość</th>
            <th>Data przepisania leku</th>
            <th className="icons">
              <AiIcons.AiOutlineDelete className="deleteIcon" onClick={handleDelete} />
              <AiIcons.AiOutlineFilePdf />
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
    </div>
  );
};

export default DocsCard;
