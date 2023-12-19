import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { allPatientsRequest, deletePatientById } from '../../../api/patientsRequests';
import PatientForm from '../../AddPage/PatientForm/PatientForm';
import AddIllness from '../../AddPage/AddIllness';
import { illnessesRequest, deleteIllnessRequest } from '../../../api/illnessHistoryRequests';
import AddVisitType from '../../AddPage/AddVisitType';
import { visitTypeRequest, deleteVisitTypeRequest } from '../../../api/visitTypeRequest';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ShowVisitTypeComponent = () => {
    const [visit_typeData, setVisitTypeData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedVisitType, setSelectedVisitType] = useState([]);
    const [openTable, setOpenTable] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await visitTypeRequest();
                setVisitTypeData(data);

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

    const handleDelete = async (visit_typeId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteVisitTypeRequest(visit_typeId);
            console.log('VisitType deleted successfully');
            const data = await visitTypeRequest();
            setVisitTypeData(data);
            openSnackbar("success", "Typ wizyty usunięty pomyślnie!");
        } catch (error) {
            console.error('Error deleting visit_type:', error);
            openSnackbar("error", "Błąd podczas usuwania typu wizyty.");
        }
    };

    const editVisitType = (visit_type) => {
        setSelectedVisitType(visit_type);
        setOpenEditForm(true);
        setOpenTable(false);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedVisitType(null);
        const data = await visitTypeRequest();
        setVisitTypeData(data);
        setOpenTable(true);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'visit_type_name', label: 'Nazwa typu wizyty' }]


    return (
        <>
        <div>
            {openTable && <DynamicTable columns={columns} data={visit_typeData} onDelete={handleDelete} onEdit={editVisitType} title={"Typy wizyt"} />}
            {openEditForm && (<AddVisitType initialValues={selectedVisitType} onClose={closeForm} snackbar={openSnackbar}/>)}

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

export default ShowVisitTypeComponent;
