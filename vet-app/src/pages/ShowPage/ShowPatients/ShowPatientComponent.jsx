import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { allPatientsRequest, deletePatientById } from '../../../api/patientsRequests';
import PatientForm from '../../AddPage/PatientForm/PatientForm';

const ShowPatientComponent = () => {
    const [patientData, setPatientData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState([]);

    useEffect(() => {
        // Fetch patient data and set it to the state
        // Replace this with your actual data fetching logic
        const fetchData = async () => {
            try {
                const data = await allPatientsRequest();
                setPatientData(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            // Example data fetching
        };

        fetchData();
    }, []);

    const handleDelete = async (patientId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deletePatientById(patientId);
            console.log('Patient deleted successfully');
            const data = await allPatientsRequest();
            setPatientData(data);
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const editPatient = (patient) => {
        setSelectedPatient(patient);
        setOpenEditForm(true);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedPatient(null);
        const updatedData = await allPatientsRequest();
        setPatientData(updatedData);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'patient_name', label: 'Imię pacjenta' },
    { key: 'patient_date_of_birth', label: 'Data urodzenia pacjenta' },];


    return (
        <div>
            <DynamicTable columns={columns} data={patientData} onDelete={handleDelete} onEdit={editPatient} title={"Pacjenci"} />
            {openEditForm && (<PatientForm initialValues={selectedPatient} onClose={closeForm}/>)}

        </div>
    );
};

export default ShowPatientComponent;
