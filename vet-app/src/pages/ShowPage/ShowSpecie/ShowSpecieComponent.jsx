import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import AddSpecies from '../../AddPage/AddSpecies';
import { allSpeciesRequest, deleteSpecieRequest } from '../../../api/speciesRequests';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ShowSpecieComponent = () => {
    const [specieData, setSpecieData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedSpecie, setSelectedSpecie] = useState([]);
    const [openTable, setOpenTable] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await allSpeciesRequest();
                setSpecieData(data);

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

    const handleDelete = async (specieId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteSpecieRequest(specieId);
            console.log('Specie deleted successfully');
            const data = await allSpeciesRequest();
            setSpecieData(data);
            openSnackbar("success", "Gatunek usunięty pomyślnie!");
        } catch (error) {
            console.error('Error deleting specie:', error);
            openSnackbar("error", "Błąd podczas usuwania gatunku.");
        }
    };

    const editSpecie = (specie) => {
        setSelectedSpecie(specie);
        setOpenEditForm(true);
        setOpenTable(false);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedSpecie(null);
        const data = await allSpeciesRequest();
        setSpecieData(data);
        setOpenTable(true);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'species_name', label: 'Nazwa gatunku' }]


    return (
        <>
        <div>
            {openTable && <DynamicTable columns={columns} data={specieData} onDelete={handleDelete} onEdit={editSpecie} title={"Gatunki"}/>}
            {openEditForm && (<AddSpecies initialValues={selectedSpecie} onClose={closeForm} snackbar={openSnackbar}/>)}

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

export default ShowSpecieComponent;
