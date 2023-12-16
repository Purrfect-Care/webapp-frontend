import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const FilterAdminVisits = () => {
    const { vets, setVets, updateVets, selectAll, setSelectAll } = useContext(GlobalContext);
  
    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setVets(vets.map((vet) => ({ ...vet, checked: newSelectAll })));
        setSelectAll(newSelectAll);
      };      
  
    return (
      <React.Fragment>
        <p className="text-gray-500 font-bold mt-10">Wybrani weterynarze</p>
        <label className="items-center mt-6 block">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAllChange}
            className={`form-checkbox h-5 w-5 rounded focus:ring-0 black-border cursor-pointer`}
          />
          <span className={`ml-2 text-gray-700 px-2 py-1 rounded`}>Wybierz wszystkich</span>
        </label>
        {vets.map(({ id, firstName, lastName, checked }, idx) => (
          <label key={idx} className="items-center mt-6 block">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => updateVets({ id, firstName, lastName, checked: !checked })}
              className={`form-checkbox h-5 w-5 rounded focus:ring-0 black-border cursor-pointer`}
            />
            <span className={`ml-2 text-gray-700 px-2 py-1 capitalize rounded`}>{firstName} {lastName}</span>
          </label>
        ))}
      </React.Fragment>
    );
  };  

export default FilterAdminVisits;

