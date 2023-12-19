import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { getClinicsRequest, deleteClinicById } from '../../../api/clinicRequests';
import AddClinic from '../../AddPage/AddClinic/AddClinic';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ShowClinicComponent = () => {
    const [clinicData, setClinicData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState([]);
    const [openTable, setOpenTable] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClinicsRequest();
                setClinicData(data);

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

    const handleDelete = async (clinicId) => {
        try {
            await deleteClinicById(clinicId);
            console.log('Clinic deleted successfully');
            const data = await getClinicsRequest();
            setClinicData(data);
            openSnackbar("success", "Klinika usunięta pomyślnie!");
        } catch (error) {
            console.error('Error deleting clinic:', error);
            openSnackbar("error", "Błąd podczas usuwania kliniki.");
        }
    };

    const editClinic = (clinic) => {
        setSelectedClinic(clinic);
        setOpenEditForm(true);
        setOpenTable(false);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedClinic(null);
        const data = await getClinicsRequest();
        setClinicData(data);
        setOpenTable(true);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'clinic_name', label: 'Nazwa' },
    { key: 'clinic_address', label: 'Adres' },
    { key: 'clinic_postcode', label: 'Kod pocztowy' },
    { key: 'clinic_city', label: 'Miasto kliniki' },
];


    return (
        <>
        <div>
            {openTable && <DynamicTable columns={columns} data={clinicData} onDelete={handleDelete} onEdit={editClinic} title={"Klinika"} />}
            {openEditForm && (<AddClinic initialValues={selectedClinic} onClose={closeForm} snackbar={openSnackbar}/>)}

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

export default ShowClinicComponent;
