import React from 'react';
import PatientBar from '../Patients/PatientBar/PatientBar';
import './PatientsPage.css';
import PatientSection from '../Patients/PatientSection/PatientSection';
import Sidebar from '../../components/Sidebar/Sidebar';

const PatientsPage = () => {
    return (
        <>
        <Sidebar />
        <div className='patientsPage'>
            <PatientBar />
            <PatientSection puppyName="Reksio" age="4" breed="Golden Retriever"/>
        </div>
        </>
    );
}

export default PatientsPage;