import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import AddSpecies from '../../AddPage/AddSpecies';
import { allSpeciesRequest, deleteSpecieRequest } from '../../../api/speciesRequests';

const ShowSpecieComponent = () => {
    const [specieData, setSpecieData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedSpecie, setSelectedSpecie] = useState([]);

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

    const handleDelete = async (specieId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteSpecieRequest(specieId);
            console.log('Specie deleted successfully');
            const data = await allSpeciesRequest();
            setSpecieData(data);
        } catch (error) {
            console.error('Error deleting specie:', error);
        }
    };

    const editSpecie = (specie) => {
        setSelectedSpecie(specie);
        setOpenEditForm(true);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedSpecie(null);
        const data = await allSpeciesRequest();
        setSpecieData(data);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'species_name', label: 'Nazwa gatunku' }]


    return (
        <div>
            <h2>Gatunki</h2>
            <DynamicTable columns={columns} data={specieData} onDelete={handleDelete} onEdit={editSpecie} />
            {openEditForm && (<AddSpecies initialValues={selectedSpecie} onClose={closeForm}/>)}

        </div>
    );
};

export default ShowSpecieComponent;
