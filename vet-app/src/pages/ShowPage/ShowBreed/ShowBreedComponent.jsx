import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import AddBreed from '../../AddPage/AddBreed';
import { allBreedsRequest, deleteBreedRequest } from '../../../api/breedRequests';
const ShowBreedComponent = () => {
    const [breedData, setBreedData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedBreed, setSelectedBreed] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await allBreedsRequest();
                setBreedData(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (breedId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteBreedRequest(breedId);
            console.log('Breed deleted successfully');
            const data = await allBreedsRequest();
            setBreedData(data);
        } catch (error) {
            console.error('Error deleting breed:', error);
        }
    };

    const editBreed = (breed) => {
        setSelectedBreed(breed);
        setOpenEditForm(true);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedBreed(null);
        const data = await allBreedsRequest();
        setBreedData(data);
      };




    const columns = [{ key: 'id', label: 'ID' },
    {key: 'breeds_species.species_name', label: "Nazwa gatunku"},
    { key: 'breed_name', label: 'Nazwa rasy' },]

    return (
        <div>
            <DynamicTable columns={columns} data={breedData} onDelete={handleDelete} onEdit={editBreed} title={"Rasy"} />
            {openEditForm && (<AddBreed initialValues={selectedBreed} onClose={closeForm}/>)}

        </div>
    );
};

export default ShowBreedComponent;
