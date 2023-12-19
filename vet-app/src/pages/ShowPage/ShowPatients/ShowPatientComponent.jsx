import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { allPatientsRequest, deletePatientById } from '../../../api/patientsRequests';
import PatientForm from '../../AddPage/PatientForm/PatientForm';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ShowPatientComponent = () => {
    const [patientData, setPatientData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState([]);
    const [openTable, setOpenTable] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
            const fetchData = async () => {
            try {
                const data = await allPatientsRequest();
                setPatientData(data);

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

    const handleDelete = async (patientId) => {
        try {
            await deletePatientById(patientId);
            console.log('Patient deleted successfully');
            const data = await allPatientsRequest();
            setPatientData(data);
            openSnackbar("success", "Pacjent usunięty pomyślnie!");
        } catch (error) {
            console.error('Error deleting patient:', error);
            openSnackbar("error", "Błąd podczas usuwania pacjenta.");
        }
    };

    const editPatient = (patient) => {
        setSelectedPatient(patient);
        setOpenEditForm(true);
        setOpenTable(false);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedPatient(null);
        const updatedData = await allPatientsRequest();
        setPatientData(updatedData);
        setOpenTable(true);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'patient_name', label: 'Imię pacjenta' },
    { key: 'patient_date_of_birth', label: 'Data urodzenia pacjenta' },];


    return (
        <>
        <div>
            {openTable && <DynamicTable columns={columns} data={patientData} onDelete={handleDelete} onEdit={editPatient} title={"Pacjenci"} />}
            {openEditForm && (<PatientForm initialValues={selectedPatient} onClose={closeForm} snackbar={openSnackbar}/>)}
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

export default ShowPatientComponent;
