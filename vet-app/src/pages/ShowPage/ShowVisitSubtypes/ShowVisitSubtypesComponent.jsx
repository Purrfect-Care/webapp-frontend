import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import AddBreed from '../../AddPage/AddBreed';
import { allBreedsRequest, deleteBreedRequest } from '../../../api/breedRequests';
import AddVisitSubtype from '../../AddPage/AddVisitSubtype';
import { visitSubtypeRequest, deleteVisitSubtypeRequest } from '../../../api/visitSubtypeRequest';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ShowVisitSubtypeComponent = () => {
    const [visit_subtypeData, setVisitSubtypeData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedVisitSubtype, setSelectedVisitSubtype] = useState([]);
    const [openTable, setOpenTable] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await visitSubtypeRequest();
                setVisitSubtypeData(data);

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

    const handleDelete = async (visit_subtypeId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteVisitSubtypeRequest(visit_subtypeId);
            console.log('VisitSubtype deleted successfully');
            const data = await visitSubtypeRequest();
            setVisitSubtypeData(data);
            openSnackbar("success", "Podtyp wizyty usunięty pomyślnie!");
        } catch (error) {
            console.error('Error deleting visit_subtype:', error);
            openSnackbar("error", "Błąd podczas usuwania podtypu wizyty.");
        }
    };

    const editVisitSubtype = (visit_subtype) => {
        setSelectedVisitSubtype(visit_subtype);
        setOpenEditForm(true);
        setOpenTable(false);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedVisitSubtype(null);
        const data = await visitSubtypeRequest();
        setVisitSubtypeData(data);
        setOpenTable(true);
      };




    const columns = [{ key: 'id', label: 'ID' },
    {key: 'visit_subtype_type.visit_type_name', label: "Nazwa typu wizyty"},
    { key: 'visit_subtype_name', label: 'Nazwa podtypu wizyty' },]

    return (
        <>
        <div>
            {openTable && <DynamicTable columns={columns} data={visit_subtypeData} onDelete={handleDelete} onEdit={editVisitSubtype} title={"Podtypy wizyt"} />}
            {openEditForm && (<AddVisitSubtype initialValues={selectedVisitSubtype} onClose={closeForm} snackbar={openSnackbar}/>)}

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

export default ShowVisitSubtypeComponent;
