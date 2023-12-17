import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { getClinicsRequest, deleteClinicById } from '../../../api/clinicRequests';
import AddClinic from '../../AddPage/AddClinic/AddClinic';

const ShowClinicComponent = () => {
    const [clinicData, setClinicData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClinicsRequest();
                setClinicData(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (clinicId) => {
        try {
            await deleteClinicById(clinicId);
            console.log('Clinic deleted successfully');
            const data = await getClinicsRequest();
            setClinicData(data);
        } catch (error) {
            console.error('Error deleting clinic:', error);
        }
    };

    const editClinic = (clinic) => {
        setSelectedClinic(clinic);
        setOpenEditForm(true);
      };


      const closeForm = () => {
        setOpenEditForm(false);
        setSelectedClinic(null);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'clinic_name', label: 'Nazwa' },
    { key: 'clinic_address', label: 'Adres' },
    { key: 'clinic_postcode', label: 'Kod pocztowy' },
    { key: 'clinic_city', label: 'Miasto kliniki' },
];


    return (
        <div>
            <h2>Kliniki</h2>
            <DynamicTable columns={columns} data={clinicData} onDelete={handleDelete} onEdit={editClinic} />
            {openEditForm && (<AddClinic initialValues={selectedClinic} onClose={closeForm}/>)}

        </div>
    );
};

export default ShowClinicComponent;
