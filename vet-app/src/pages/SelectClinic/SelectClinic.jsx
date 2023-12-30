import React, { useState, useEffect } from 'react';
import { getClinicsRequest } from '../../api/clinicRequests';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './SelectClinic.css';


const SelectClinic = ({ onClose, onSubmit, initialPrescriptionValues }) => {
    const [allClinics, setAllClinics] = useState([]);
    const [selectedClinicId, setSelectedClinicId] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(true);
    const navigate = useNavigate();

    // Fetch clinics from Django API on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const clinics = await getClinicsRequest();
                setAllClinics(clinics);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Get the current employee data from local storage
    const currentEmployeeData = JSON.parse(localStorage.getItem('employeeData')) || {};
    const { employees_clinic_id, ...restEmployeeData } = currentEmployeeData;

    // Set the initial selected clinic ID
    useEffect(() => {
        setSelectedClinicId(employees_clinic_id || '');
    }, [employees_clinic_id]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Update local storage with the selected clinic ID and preserve other employee data
        localStorage.setItem('employeeData', JSON.stringify({
            ...restEmployeeData,
            employees_clinic_id: selectedClinicId,
        }));

        openSnackbar('success', 'Wybór kliniki zakończony sukcesem!');
        setTimeout(() => {
            navigate(`/calendar`, { replace: true });
        }, 3000);



        // Add additional logic if needed, e.g., API request to update server-side data

        // Reset the form or close the popup if needed
    };

    const openSnackbar = (severity, message) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleClose = () => {
        setIsFormOpen(false);
        navigate(`/calendar`, { replace: true });
    };

    return (
        <>
            <div className="addPage">
                <Sidebar />
                <div className="mainPart">
                    <div className="addPageNav">
                        <div className={`overlay-select_clinic ${isFormOpen ? 'active' : ''}`}></div>
                        <form className='select-clinic-form' onSubmit={handleSubmit}>
                            <h2>Wybierz klinikę</h2>
                            <label>
                                <select className='select-clinic' value={selectedClinicId} onChange={(e) => setSelectedClinicId(e.target.value)}>
                                    <option value="">-</option>
                                    {allClinics.map((clinic) => (
                                        <option key={clinic.id} value={clinic.id}>
                                            {clinic.clinic_name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <div className='button-container-select-clinic-form'>
                                <button className='form-button-select-clinic-form' type="submit">Zatwierdź</button>
                                <button className='form-button-cancel-clinic-form' onClick={handleClose}>Anuluj</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default SelectClinic;