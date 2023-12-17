import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { allPatientsRequest, deletePatientById } from '../../../api/patientsRequests';
import PatientForm from '../../AddPage/PatientForm/PatientForm';
import AddIllness from '../../AddPage/AddIllness';
import { illnessesRequest, deleteIllnessRequest } from '../../../api/illnessHistoryRequests';

const ShowIllnessComponent = () => {
    const [illnessData, setIllnessData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedIllness, setSelectedIllness] = useState([]);

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

    const handleDelete = async (illnessId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteIllnessRequest(illnessId);
            console.log('Illness deleted successfully');
            const data = await illnessesRequest();
            setIllnessData(data);
        } catch (error) {
            console.error('Error deleting illness:', error);
        }
    };

    const editIllness = (illness) => {
        setSelectedIllness(illness);
        setOpenEditForm(true);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedIllness(null);
        const data = await illnessesRequest();
        setIllnessData(data);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'illness_name', label: 'Nazwa choroby' }]


    return (
        <div>
            <DynamicTable columns={columns} data={illnessData} onDelete={handleDelete} onEdit={editIllness} title={"Choroby"} />
            {openEditForm && (<AddIllness initialValues={selectedIllness} onClose={closeForm}/>)}

        </div>
    );
};

export default ShowIllnessComponent;
