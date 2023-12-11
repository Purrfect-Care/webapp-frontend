import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { addSpeciesRequest } from "../../api/speciesRequests";

const AddSpecies = () => {
  const [species, setSpecies] = useState({ species_name: "" });

  const handleAddSpecies = async (e) => {
    e.preventDefault();

    try {
      const response = await addSpeciesRequest(species);

      console.log("Species added successfully", response);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      //confirmation popup
      setSpecies({ species_name: "" });
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="mainPart">
        <div className="flex items-start justify-center h-full">
          <div className="flex flex-col items-center mt-20">
            <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
              Formularz dodawania nowego gatunku
            </h3>
            <input
              className="rounded h-12 w-96 border-none mb-4"
              type="text"
              placeholder="Nazwa gatunku"
              name="species_name"
              value={species.species_name}
              onChange={(e) =>
                setSpecies({
                  ...species,
                  species_name: e.target.value,
                })
              }
            />
            <button
              type="submit"
              onClick={handleAddSpecies}
              className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded text-white hover:shadow-md"
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSpecies;
