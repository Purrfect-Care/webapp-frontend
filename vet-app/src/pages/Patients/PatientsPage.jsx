import React from 'react';
import PatientBar from '../Patients/PatientBar/PatientBar';
import './PatientsPage.css';
import PatientSection from '../Patients/PatientSection/PatientSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useParams } from 'react-router';

const PatientsPage = () => {
    const { id } = useParams();

    return (
        <>
        <Sidebar />
        <div className='patientsPage'>
            <PatientBar />
            <PatientSection patientId={ id }/>
        </div>
        </>
    );
}

export default PatientsPage;