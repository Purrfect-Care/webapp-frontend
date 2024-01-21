import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const getCheckboxClass = (label) => {
  if (!label) return "";
  switch (label.toLowerCase()) {
    case "zaplanowana":
      return "text-yellow-400";
    case "odwołana":
      return "text-red-400";
    default:
      return "text-green-400";
  }
};

const getLabelClass = (label) => {
  if (!label) return "";
  switch (label.toLowerCase()) {
    case "zaplanowana":
      return "bg-yellow-400";
    case "odwołana":
      return "bg-red-400";
    default:
      return "bg-green-400";
  }
};

const LabelsCalendar = () => {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Status wizyty</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-6 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`form-checkbox h-5 w-5 rounded focus:ring-0 black-border cursor-pointer ${getCheckboxClass(
              lbl
            )}`}
          />
          <span
            className={`ml-2 text-gray-700 px-2 py-1 capitalize rounded ${getLabelClass(
              lbl
            )}`}
          >
            {lbl}
          </span>
        </label>
      ))}
    </React.Fragment>
  );
};

export default LabelsCalendar;
