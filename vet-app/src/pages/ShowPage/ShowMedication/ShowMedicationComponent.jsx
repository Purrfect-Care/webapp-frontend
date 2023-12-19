import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import AddMedications from '../../AddPage/AddMedications';
import { allMedicationsRequest, deleteMedicationRequest } from '../../../api/medicationsRequest';
import { deleteEmptyPrescriptionsRequest } from '../../../api/prescriptionRequests';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ShowMedicationComponent = () => {
    const [medicationData, setMedicationData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState([]);
    const [openTable, setOpenTable] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await allMedicationsRequest();
                setMedicationData(data);

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

    const handleDelete = async (medicationId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteMedicationRequest(medicationId);
            console.log('Medication deleted successfully');
            await deleteEmptyPrescriptionsRequest();
            const data = await allMedicationsRequest();
            setMedicationData(data);
            openSnackbar("success", "Lek usunięty pomyślnie!");
        } catch (error) {
            console.error('Error deleting medication:', error);
            openSnackbar("error", "Błąd podczas usuwania leku.");
        }
    };

    const editMedication = (medication) => {
        setSelectedMedication(medication);
        setOpenEditForm(true);
        setOpenTable(false);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedMedication(null);
        const data = await allMedicationsRequest();
        setMedicationData(data);
        setOpenTable(true);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'medication_name', label: 'Nazwa leku' }]


    return (
        <>
        <div>
            {openTable && <DynamicTable columns={columns} data={medicationData} onDelete={handleDelete} onEdit={editMedication} title={"Leki"} />}
            {openEditForm && (<AddMedications initialValues={selectedMedication} onClose={closeForm} snackbar={openSnackbar}/>)}

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

export default ShowMedicationComponent;
