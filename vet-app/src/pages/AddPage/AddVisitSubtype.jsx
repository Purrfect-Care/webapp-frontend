import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { addVisitSubtypeRequest } from "../../api/visitSubtypeRequest";
import { visitTypeRequest } from "../../api/visitTypeRequest";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AddVisitSubtype = () => {
  const [formValues, setFormValues] = useState({
    visit_subtype_name: "",
    visit_subtypes_visit_type_id: "",
  });
  const [visitsTypeData, setVisitsTypeData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errors, setErrors] = useState({
    visit_subtype_name: "",
    visit_subtypes_visit_type_id: "",
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

    if (!formValues.visit_subtype_name.trim()) {
      newErrors.visit_subtype_name = "Podaj nazwę podtypu wizyty.";
      valid = false;
    } else {
      newErrors.visit_subtype_name = "";
    }

    if (!formValues.visit_subtypes_visit_type_id) {
      newErrors.visit_subtypes_visit_type_id = "Wybierz typ wizyty.";
      valid = false;
    } else {
      newErrors.visit_subtypes_visit_type_id = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    clearErrors(name);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddVisitSubtype = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await addVisitSubtypeRequest(formValues);
      console.log("Visit subtype added successfully", response);
      openSnackbar("success", "Podtyp wizyty dodany pomyślnie");
      setFormValues({
        visit_subtype_name: "",
        visit_subtypes_visit_type_id: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
      openSnackbar("error", "Błąd podczas dodawania podtypu wizyty");
    }
  };

  useEffect(() => {
    console.log("Fetching type visit data...");
    const fetchData = async () => {
      try {
        const visitsTypeData = await visitTypeRequest();
        setVisitsTypeData(visitsTypeData);
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
                Formularz dodawania nowego podtypu wizyty
              </h3>
              <div className="relative pb-8 mb-2">
                <select
                  name="visit_subtypes_visit_type_id"
                  className={`rounded-md h-12 w-96 ${
                    errors.visit_subtypes_visit_type_id
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={handleInputChange}
                  value={formValues.visit_subtypes_visit_type_id}
                >
                  <option value="">Wybierz typ wizyty</option>
                  {visitsTypeData.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.visit_type_name}
                    </option>
                  ))}
                </select>

                {errors.visit_subtypes_visit_type_id && (
                  <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                    {errors.visit_subtypes_visit_type_id}
                  </span>
                )}
              </div>
              <div className="relative pb-8 mb-2">
                <input
                  className={`rounded h-12 w-96 ${
                    errors.visit_subtype_name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="Nazwa podtypu wizyty"
                  name="visit_subtype_name"
                  value={formValues.visit_subtype_name}
                  onChange={handleInputChange}
                />
                {errors.visit_subtype_name && (
                  <span className="text-red-500 text-sm absolute bottom-0 right-0 mb-2 mr-2">
                    {errors.visit_subtype_name}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="whitespace-nowrap text-sm mr-28 text-emerald-950">
                  <h5>Nie ma potrzebnego typu wizyty?</h5>
                  <a
                    href="http://localhost:3000/add-visit-type"
                    className="font-semibold"
                  >
                    Dodaj go.
                  </a>
                </span>

                <button
                  type="submit"
                  onClick={handleAddVisitSubtype}
                  className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded text-white hover:shadow-md"
                >
                  Dodaj
                </button>
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

export default AddVisitSubtype;
