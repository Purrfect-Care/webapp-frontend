import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import AddMedications from '../../AddPage/AddMedications';
import { allMedicationsRequest, deleteMedicationRequest } from '../../../api/medicationsRequest';
const ShowMedicationComponent = () => {
    const [medicationData, setMedicationData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState([]);

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

    const handleDelete = async (medicationId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteMedicationRequest(medicationId);
            console.log('Medication deleted successfully');
            const data = await allMedicationsRequest();
            setMedicationData(data);
        } catch (error) {
            console.error('Error deleting medication:', error);
        }
    };

    const editMedication = (medication) => {
        setSelectedMedication(medication);
        setOpenEditForm(true);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedMedication(null);
        const data = await allMedicationsRequest();
        setMedicationData(data);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'medication_name', label: 'Nazwa leku' }]


    return (
        <div>
            <DynamicTable columns={columns} data={medicationData} onDelete={handleDelete} onEdit={editMedication} title={"Leki"} />
            {openEditForm && (<AddMedications initialValues={selectedMedication} onClose={closeForm}/>)}

        </div>
    );
};

export default ShowMedicationComponent;
