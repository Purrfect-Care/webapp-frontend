import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { allPatientsRequest, deletePatientById } from '../../../api/patientsRequests';
import PatientForm from '../../AddPage/PatientForm/PatientForm';
import AddIllness from '../../AddPage/AddIllness';
import { illnessesRequest, deleteIllnessRequest } from '../../../api/illnessHistoryRequests';
import AddVisitType from '../../AddPage/AddVisitType';
import { visitTypeRequest, deleteVisitTypeRequest } from '../../../api/visitTypeRequest';

const ShowVisitTypeComponent = () => {
    const [visit_typeData, setVisitTypeData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedVisitType, setSelectedVisitType] = useState([]);

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

    const handleDelete = async (visit_typeId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteVisitTypeRequest(visit_typeId);
            console.log('VisitType deleted successfully');
            const data = await visitTypeRequest();
            setVisitTypeData(data);
        } catch (error) {
            console.error('Error deleting visit_type:', error);
        }
    };

    const editVisitType = (visit_type) => {
        setSelectedVisitType(visit_type);
        setOpenEditForm(true);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedVisitType(null);
        const data = await visitTypeRequest();
        setVisitTypeData(data);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'visit_type_name', label: 'Nazwa typu wizyty' }]


    return (
        <div>
            <DynamicTable columns={columns} data={visit_typeData} onDelete={handleDelete} onEdit={editVisitType} title={"Typy wizyt"} />
            {openEditForm && (<AddVisitType initialValues={selectedVisitType} onClose={closeForm}/>)}

        </div>
    );
};

export default ShowVisitTypeComponent;
