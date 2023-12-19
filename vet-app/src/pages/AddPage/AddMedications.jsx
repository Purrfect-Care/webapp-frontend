import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { addMedicationsRequest } from "../../api/medicationRequests";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { updateMedicationRequest } from "../../api/medicationsRequest";

const AddMedications = ({ initialValues, onClose, snackbar }) => {
  const [medication, setMedication] = useState({ medication_name: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const updateFormValues = async () => {
      if (initialValues) {
        setMedication(initialValues);
      }
    }
    updateFormValues();
  }, [initialValues]);

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const clearErrors = () => {
    setErrorMessage("");
  };

  const handleAddMedication = async (e) => {
    e.preventDefault();

    clearErrors();

    if (!medication.medication_name.trim()) {
      setErrorMessage("Podaj nazwę leku.");
      return;
    }

    try {

      if (initialValues) {
        const response = await updateMedicationRequest(initialValues.id, medication);

        console.log("Medication updated successfully", response);
        onClose();
        snackbar("success", "Lek zmodyfikowany pomyślnie!");

      } else {

        const response = await addMedicationsRequest(medication);

        console.log("Medication added successfully", response);
        openSnackbar("success", "Lek dodany pomyślnie");
        setMedication({ medication_name: "" });
      }
    } catch (error) {
      console.error("Error:", error.message);
      openSnackbar("error", "Błąd podczas dodawania leku");
      snackbar("error", "Błąd podczas dodawania leku");
    }
  };

  const isError = errorMessage !== "";

  return (
    <>
      <div>
        <Sidebar />
        <div className="mainPart">
          <div className="flex items-start justify-center h-full">
            <div className="flex flex-col items-center mt-20">
              <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
                Formularz dodawania nowego leku
              </h3>
              <div className="relative pb-8 mb-2">
                <input
                  className={`rounded h-12 w-96 ${isError ? "border-red-500" : "border-gray-300"
                    }`}
                  type="text"
                  placeholder="Nazwa leku"
                  name="medication_name"
                  value={medication.medication_name}
                  onChange={(e) => {
                    clearErrors();
                    setMedication({
                      ...medication,
                      medication_name: e.target.value,
                    });
                  }}
                />
                {errorMessage && (
                  <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                    {errorMessage}
                  </span>
                )}
              </div>
              {!initialValues && <button
                type="submit"
                onClick={handleAddMedication}
                className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded text-white hover:shadow-md"
              >
                Dodaj
              </button>}
              {initialValues && (
                <div className="mx-15vh mt-auto mb-5vh flex justify-center">
                  <button
                    type="submit"
                    onClick={handleAddMedication}
                    className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded text-white hover:shadow-md mr-10"
                  >
                    Edytuj
                  </button>
                  <button
                    type="submit"
                    onClick={() => onClose()}
                    className="bg-red-600 hover:bg-red-800 px-10 py-2 rounded text-white hover:shadow-md"
                  >
                    Anuluj
                  </button>
                </div>
              )}

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

export default AddMedications;
