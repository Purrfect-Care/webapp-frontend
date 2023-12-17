import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import AddBreed from '../../AddPage/AddBreed';
import { allBreedsRequest, deleteBreedRequest } from '../../../api/breedRequests';
import AddVisitSubtype from '../../AddPage/AddVisitSubtype';
import { visitSubtypeRequest, deleteVisitSubtypeRequest } from '../../../api/visitSubtypeRequest';
const ShowVisitSubtypeComponent = () => {
    const [visit_subtypeData, setVisitSubtypeData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedVisitSubtype, setSelectedVisitSubtype] = useState([]);

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

    const handleDelete = async (visit_subtypeId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteVisitSubtypeRequest(visit_subtypeId);
            console.log('VisitSubtype deleted successfully');
            const data = await visitSubtypeRequest();
            setVisitSubtypeData(data);
        } catch (error) {
            console.error('Error deleting visit_subtype:', error);
        }
    };

    const editVisitSubtype = (visit_subtype) => {
        setSelectedVisitSubtype(visit_subtype);
        setOpenEditForm(true);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedVisitSubtype(null);
        const data = await visitSubtypeRequest();
        setVisitSubtypeData(data);
      };




    const columns = [{ key: 'id', label: 'ID' },
    {key: 'visit_subtype_type.visit_type_name', label: "Nazwa typu wizyty"},
    { key: 'visit_subtype_name', label: 'Nazwa podtypu wizyty' },]

    return (
        <div>
            <DynamicTable columns={columns} data={visit_subtypeData} onDelete={handleDelete} onEdit={editVisitSubtype} title={"Podtypy wizyt"} />
            {openEditForm && (<AddVisitSubtype initialValues={selectedVisitSubtype} onClose={closeForm}/>)}

        </div>
    );
};

export default ShowVisitSubtypeComponent;
