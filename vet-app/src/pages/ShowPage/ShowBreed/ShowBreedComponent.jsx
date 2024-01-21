import React, { useEffect, useState } from "react";
import DynamicTable from "../DynamicTable";
import AddBreed from "../../AddPage/AddBreed";
import {
  allBreedsRequest,
  deleteBreedRequest,
} from "../../../api/breedRequests";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ShowBreedComponent = () => {
  const [breedData, setBreedData] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [openTable, setOpenTable] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await allBreedsRequest();
        setBreedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleDelete = async (breedId) => {
    try {
      await deleteBreedRequest(breedId);

      const data = await allBreedsRequest();
      setBreedData(data);
      openSnackbar("success", "Rasa usunięta pomyślnie!");
    } catch (error) {
      console.error("Error deleting breed:", error);
      openSnackbar("error", "Błąd podczas usuwania rasy.");
    }
  };

  const editBreed = (breed) => {
    setSelectedBreed(breed);
    setOpenEditForm(true);
    setOpenTable(false);
  };

  const closeForm = async () => {
    setOpenEditForm(false);
    setSelectedBreed(null);
    const data = await allBreedsRequest();
    setBreedData(data);
    setOpenTable(true);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "breeds_species.species_name", label: "Nazwa gatunku" },
    { key: "breed_name", label: "Nazwa rasy" },
  ];

  return (
    <>
      <div>
        {openTable && (
          <DynamicTable
            columns={columns}
            data={breedData}
            onDelete={handleDelete}
            onEdit={editBreed}
            title={"Rasy"}
          />
        )}
        {openEditForm && (
          <AddBreed
            initialValues={selectedBreed}
            onClose={closeForm}
            snackbar={openSnackbar}
          />
        )}
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

export default ShowBreedComponent;
