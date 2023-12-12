import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { addBreedRequest } from "../../api/breedRequests";
import { allSpeciesRequest } from "../../api/speciesRequests";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AddBreed = () => {
  const [formValues, setFormValues] = useState({
    breed_name: "",
    breeds_species_id: "",
  });
  const [speciesData, setSpeciesData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errors, setErrors] = useState({
    breed_name: "",
    breeds_species_id: "",
  });

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const clearErrors = (name) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formValues.breed_name.trim()) {
      newErrors.breed_name = "Podaj nazwę rasy.";
      valid = false;
    } else {
      newErrors.breed_name = "";
    }

    if (!formValues.breeds_species_id) {
      newErrors.breeds_species_id = "Wybierz gatunek.";
      valid = false;
    } else {
      newErrors.breeds_species_id = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    clearErrors(name);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddBreed = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await addBreedRequest(formValues);
      console.log("Breed added successfully", response);
      openSnackbar("success", "Rasa dodana pomyślnie");
      setFormValues({
        breed_name: "",
        breeds_species_id: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
      openSnackbar("error", "Błąd podczas dodawania rasy");
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
    <>
      <div>
        <Sidebar />
        <div className="mainPart">
          <div className="flex items-start justify-center h-full">
            <div className="flex flex-col items-center mt-20">
              <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
                Formularz dodawania nowej rasy
              </h3>
              <div className="relative pb-8 mb-2">
                <select
                  name="breeds_species_id"
                  className={`rounded-md h-12 w-96 ${
                    errors.breeds_species_id ? 'border-red-500' : 'border-gray-300'}`}
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
                {errors.breeds_species_id && (
                  <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                    {errors.breeds_species_id}
                  </span>
                )}
              </div>
              <div className="relative pb-8 mb-2">
                <input
                  className={`rounded h-12 w-96 ${
                    errors.breed_name ? 'border-red-500' : 'border-gray-300'}`}
                  type="text"
                  placeholder="Nazwa rasy"
                  name="breed_name"
                  value={formValues.breed_name}
                  onChange={handleInputChange}
                />
                {errors.breed_name && (
                  <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                    {errors.breed_name}
                  </span>
                )}
              </div>
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
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default AddBreed;
