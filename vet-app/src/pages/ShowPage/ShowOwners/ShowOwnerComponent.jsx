import React, { useEffect, useState } from "react";
import DynamicTable from "../DynamicTable";
import { allOwnersRequest, deleteOwnerById } from "../../../api/ownerRequests";
import AddOwner from "../../AddPage/AddOwner/AddOwner";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ShowOwnerComponent = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState([]);
  const [openTable, setOpenTable] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await allOwnersRequest();
        setOwnerData(data);
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

  const handleDelete = async (ownerId) => {
    try {
      await deleteOwnerById(ownerId);

      openSnackbar("success", "Właściciel usunięty pomyślnie!");
      const data = await allOwnersRequest();
      setOwnerData(data);
    } catch (error) {
      console.error("Error deleting owner:", error);
      openSnackbar("error", "Błąd podczas usuwania właściciela.");
    }
  };

  const editOwner = (owner) => {
    setSelectedOwner(owner);
    setOpenEditForm(true);
    setOpenTable(false);
  };

  const closeForm = async () => {
    setOpenEditForm(false);
    setSelectedOwner(null);
    setOpenTable(true);
    const data = await allOwnersRequest();
    setOwnerData(data);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "owner_first_name", label: "Imię właściciela" },
    { key: "owner_last_name", label: "Nazwisko właściciela" },
  ];

  return (
    <>
      <div>
        {openTable && (
          <DynamicTable
            columns={columns}
            data={ownerData}
            onDelete={handleDelete}
            onEdit={editOwner}
            title={"Właściciele"}
          />
        )}
        {openEditForm && (
          <AddOwner
            initialValues={selectedOwner}
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

export default ShowOwnerComponent;
