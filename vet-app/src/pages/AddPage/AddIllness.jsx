import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  addIllnessRequest,
  updateIllnessRequest,
} from "../../api/illnessHistoryRequests";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AddIllness = ({ initialValues, onClose, snackbar }) => {
  const [illness, setIllness] = useState({ illness_name: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const updateFormValues = async () => {
      if (initialValues) {
        setIllness(initialValues);
      }
    };
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

  const handleAddIllness = async (e) => {
    e.preventDefault();

    clearErrors();

    if (!illness.illness_name.trim()) {
      setErrorMessage("Podaj nazwę choroby.");
      return;
    }

    try {
      if (initialValues) {
        const response = await updateIllnessRequest(illness.id, illness);

        onClose();
        snackbar("success", "Choroba zmodyfikowana pomyślnie!");
      } else {
        const response = await addIllnessRequest(illness);

        setIllness({ illness_name: "" });
        openSnackbar("success", "Choroba dodana pomyślnie");
      }
    } catch (error) {
      console.error("Error:", error.message);
      openSnackbar("error", "Błąd podczas dodawania choroby");
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
              <div style={{ justifyContent: "center", marginLeft: "8vh" }}>
                <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
                  Formularz dodawania nowej choroby
                </h3>
              </div>
              <div style={{ justifyContent: "center", marginLeft: "8vh" }}>
                <div className="relative pb-8 mb-2">
                  <input
                    className={`rounded h-12 w-96 ${
                      isError ? "border-red-500" : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Nazwa choroby"
                    name="illness_name"
                    value={illness.illness_name}
                    onChange={(e) => {
                      clearErrors();
                      setIllness({
                        ...illness,
                        illness_name: e.target.value,
                      });
                    }}
                  />
                  {errorMessage && (
                    <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                      {errorMessage}
                    </span>
                  )}
                </div>
                {!initialValues && (
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <button
                      type="submit"
                      onClick={handleAddIllness}
                      className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded text-white hover:shadow-md"
                    >
                      Dodaj
                    </button>
                  </div>
                )}
                {initialValues && (
                  <div className="mx-15vh mt-auto mb-5vh flex justify-center">
                    <button
                      type="submit"
                      onClick={handleAddIllness}
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

export default AddIllness;
