import React, { useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";

const FilterAdminVisits = () => {
  const { vets, setVets, selectedVet, setSelectedVet } =
    useContext(GlobalContext);

  const handleDropdownChange = (event) => {
    const selectedVetId = parseInt(event.target.value);
    const updatedVets = vets.map((vet) => ({
      ...vet,
      checked: vet.id === selectedVetId,
    }));
    setVets(updatedVets);
    setSelectedVet(selectedVetId);
  };

  return (
    <React.Fragment>
      <label className="mt-6 block">
        <span className={`text-gray-500 font-bold mt-10 px-2 py-1 rounded`}>
          Wybierz weterynarza:
        </span>
        <select
          value={selectedVet || ""}
          onChange={handleDropdownChange}
          className={`form-select border-gray-300 w-full mt-1 rounded`}
        >
          {vets.map(({ id, firstName, lastName }, idx) => (
            <option key={idx} value={id}>
              {firstName} {lastName}
            </option>
          ))}
        </select>
      </label>
    </React.Fragment>
  );
};

export default FilterAdminVisits;
