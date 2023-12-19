import React, { useRef, useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { employeeRequest } from '../api/employeesRequests';
import { patientRequest } from '../api/patientsRequests';
import './ViewPrescriptionForm.css';
import dayjs from 'dayjs';
import { getClinicByIdRequest } from '../api/clinicRequests';
import { ownerByIdRequest } from '../api/ownerRequests';
import * as Fa6Icons from "react-icons/fa6";

const ViewPrescriptionForm = ({ onClose, prescriptionDetails }) => {
    console.log(prescriptionDetails);
    const [employeeData, setEmployee] = useState([]);
    const [patientData, setPatient] = useState([]);
    const [clinicData, setClinic] = useState([]);
    const [ownerData, setOwner] = useState([]);
    const generatePDFButtonRef = useRef();
    const [isFormOpen, setIsFormOpen] =useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeData = await employeeRequest(prescriptionDetails.employee);
                setEmployee(employeeData);
                const patientData = await patientRequest(prescriptionDetails.patient);
                setPatient(patientData);
                const clinicData = await getClinicByIdRequest(employeeData.employees_clinic_id);
                setClinic(clinicData);
                const ownerData = await ownerByIdRequest(prescriptionDetails.owner);
                setOwner(ownerData);

            } catch (error) {
                console.error("Error fetching data: " + error);
            }
        };
        fetchData();
    }, []);
    const handleGeneratePDF = async () => {
        const content = document.getElementById('prescription-form');

        if (content) {
            const pdfOptions = {
                margin: 20, // Set your desired margin value in millimeters
            };

            try {
                const pdfArrayBuffer = await html2pdf().from(content).set(pdfOptions).outputPdf('arraybuffer');

                const blob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });

                const patientName = patientData.patient_name || 'UnknownPatient';
                const visitDatetime = dayjs(prescriptionDetails.prescription_date).format('YYYY-MM-DD') || 'UnknownDate';

                const filename = `Recepta_${patientName}_${visitDatetime}.pdf`;

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        }
    };

    const handleClose = () => {
        setIsFormOpen(false);
        onClose();
      };


    return (
        <div>
             <div className={`overlay-prescription-view ${isFormOpen ? 'active' : ''}`}></div>
        <div className="popup-form-prescription">
            <form className="form-sections-prescription" id="prescription-form">
                {/* Section 1: Date */}
                <div className="form-section-date">
                    <div>
                        <label className="label-date-static">Data wydania recepty</label>
                        <p className="name-prescription">{prescriptionDetails.prescription_date}</p>
                    </div>
                    <div className='clinic-data'>
                        <p>{clinicData.clinic_name}</p>
                        <p>{clinicData.clinic_address}</p>
                        <p>{clinicData.clinic_postcode}</p>
                        <p>{clinicData.clinic_city}</p>
                        <p>{clinicData.clinic_phone_number}</p>
                    </div>
                </div>

                {/* Section 2: RECEPTA */}
                <div className="form-section-title">
                    <h1 className='prescription-title'>RECEPTA</h1>
                </div>

                {/* Section 3: Weterynarz and Pacjent */}
                <div className="form-section-info">
                    <div className="name-section">
                        <label className='label-prescription'>Weterynarz</label>
                        <p className="name-prescription">{`${employeeData.employee_first_name} ${employeeData.employee_last_name}`}</p>
                    </div>
                    <div className="name-section">
                        <label className='label-prescription'>Pacjent</label>
                        <p className="name-prescription">{patientData.patient_name}</p>
                    </div>
                    <div className="name-section">
                        <label className='label-prescription'>Wlaściciel</label>
                        <p className="name-prescription">{`${ownerData.owner_first_name} ${ownerData.owner_last_name}`}</p>
                    </div>
                </div>

                {/* Section 4: Medications */}
                <div className="form-section-info">
                <label className='label-prescription'>Wypisane leki</label>
                <div className='medication-items'>
                {prescriptionDetails.prescribed_medications.map((medication, index) => (
                    <div key={index} className="medication-item">
                    <div className="medication-info">
                      <div className="medication-row">
                        <p className="medication-name">{medication.medication_name.medication_name}</p>
                        <p className="medication-amount">{medication.medication_amount}</p>
                      </div>
                      <p className="medication-dosage">Dawkowanie: {medication.medication_dosage}</p>
                    </div>
                  </div>
                  ))}
                </div>
                    
                    
                </div>
                <div className='logo-prescription'>
                        <p className='generated'>Wygenerowano za pomocą</p>
                        <Fa6Icons.FaShieldDog className="watermark" />
                        <h1 className="logo-text-prescription">PurrfectCare</h1>
                </div>
            </form>

            <div className="button-container-prescription">
                <button ref={generatePDFButtonRef} className="form-button-prescription-form" onClick={handleGeneratePDF}>
                    Wygeneruj plik PDF
                </button>
                <button className="form-button-prescription-form" onClick={onClose}>
                    Zamknij
                </button>
            </div>
        </div>
        </div>
    );
};


export default ViewPrescriptionForm;
