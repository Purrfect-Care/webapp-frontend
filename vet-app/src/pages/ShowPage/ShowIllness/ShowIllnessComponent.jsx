import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { allPatientsRequest, deletePatientById } from '../../../api/patientsRequests';
import PatientForm from '../../AddPage/PatientForm/PatientForm';
import AddIllness from '../../AddPage/AddIllness';
import { illnessesRequest, deleteIllnessRequest } from '../../../api/illnessHistoryRequests';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ShowIllnessComponent = () => {
    const [illnessData, setIllnessData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedIllness, setSelectedIllness] = useState([]);
    const [openTable, setOpenTable] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await illnessesRequest();
                setIllnessData(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const openSnackbar = (severity, message) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
      };

    const handleDelete = async (illnessId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteIllnessRequest(illnessId);
            console.log('Illness deleted successfully');
            const data = await illnessesRequest();
            setIllnessData(data);
            openSnackbar("success", "Choroba usunięta pomyślnie!");
        } catch (error) {
            console.error('Error deleting illness:', error);
            openSnackbar("error", "Błąd podczas usuwania choroby.");
        }
    };

    const editIllness = (illness) => {
        setSelectedIllness(illness);
        setOpenEditForm(true);
        setOpenTable(false);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedIllness(null);
        const data = await illnessesRequest();
        setIllnessData(data);
        setOpenTable(true);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'illness_name', label: 'Nazwa choroby' }]


    return (
        <>
            <div>
            {openTable && <DynamicTable columns={columns} data={illnessData} onDelete={handleDelete} onEdit={editIllness} title={"Choroby"} />}
            {openEditForm && (<AddIllness initialValues={selectedIllness} onClose={closeForm} snackbar={openSnackbar}/>)}

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

export default ShowIllnessComponent;
