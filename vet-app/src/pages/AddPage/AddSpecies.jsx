import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { addSpeciesRequest } from "../../api/speciesRequests";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AddSpecies = () => {
  const [species, setSpecies] = useState({ species_name: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const clearErrors = () => {
    setErrorMessage("");
  };

  const handleAddSpecies = async (e) => {
    e.preventDefault();

    clearErrors();

    if (!species.species_name.trim()) {
      setErrorMessage("Podaj nazwę gatunku.");
      return;
    }

    try {
      const response = await addSpeciesRequest(species);

      console.log("Species added successfully", response);
      openSnackbar("success", "Gatunek dodany pomyślnie");
      setSpecies({ species_name: "" });
    } catch (error) {
      console.error("Error:", error.message);
      openSnackbar("error", "Błąd podczas dodawania gatunku");
    }
  };

  const isError = errorMessage !== "";

  return (
    <div>
      <Sidebar />
      <div className="mainPart">
        <div className="flex items-start justify-center h-full">
          <div className="flex flex-col items-center mt-20">
            <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
              Formularz dodawania nowego gatunku
            </h3>
            <div className="relative pb-8 mb-2">
              <input
                className={`rounded h-12 w-96  ${isError ? 'border-red-500' : 'border-gray-300'}`}
                type="text"
                placeholder="Nazwa gatunku"
                name="species_name"
                value={species.species_name}
                onChange={(e) => {
                  clearErrors();
                  setSpecies({
                    ...species,
                    species_name: e.target.value,
                  });
                }}
              />
              {errorMessage && (
                <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                  {errorMessage}
                </span>
              )}
            </div>
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
    </div>
  );
};

export default AddSpecies;
