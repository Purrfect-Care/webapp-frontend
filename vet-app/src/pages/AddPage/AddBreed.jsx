import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { addBreedRequest } from "../../api/breedRequests";
import { allSpeciesRequest } from "../../api/speciesRequests";

const AddBreed = () => {
  const [formValues, setFormValues] = useState({
    breed_name: "",
    breeds_species_id: "",
  });
  const [speciesData, setSpeciesData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddBreed = async (e) => {
    e.preventDefault();

    try {
      const response = await addBreedRequest(formValues);
      console.log("Breed added successfully", response);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      //confirmation popup
      setFormValues({
        breed_name: "",
        breeds_species_id: "",
      });
    }
  };

  useEffect(() => {
    console.log("Fetching species data...");
    const fetchData = async () => {
      try {
        const speciesData = await allSpeciesRequest();
        setSpeciesData(speciesData);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="mainPart">
        <div className="flex items-start justify-center h-full">
          <div className="flex flex-col items-center mt-20">
            <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
              Formularz dodawania nowej rasy
            </h3>
            <select
              name="breeds_species_id"
              className="mb-6 rounded-md h-12 w-60"
              onChange={handleInputChange}
              value={formValues.breeds_species_id}
            >
              <option value="">Wybierz gatunek</option>
              {speciesData.map((species) => (
                <option key={species.id} value={species.id}>
                  {species.species_name}
                </option>
              ))}
            </select>
            <input
              className="rounded h-12 w-80 border-none mb-10"
              type="text"
              placeholder="Nazwa rasy"
              name="breed_name"
              value={formValues.breed_name}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              onClick={handleAddBreed}
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

export default AddBreed;
