import React, { useState, useEffect } from 'react';
import { allPatientsRequest } from '../../api/patientsRequests';
import { illnessesRequest } from '../../api/illnessHistoryRequests';
import './IllnessHistoryForm.css';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import utc from 'dayjs/plugin/utc'; 
import timezone from 'dayjs/plugin/timezone';

const IllnessHistoryForm = ({isOpen, onClose, initialValues, onSubmit}) => {
    const [formValues, setFormValues] = useState({
        illness_history_patient: {
            patient_name: '',
            patient_gender: null,
            patient_date_of_birth: null,
            patients_owner_id: null,
            patients_species_id: null,
            patients_breed_id: null,
            },
            illness_onset_date: null,
            illness_history_patient_id: null, 
            illness_history_illness_id: null,    
    });
    const [readOnly, setReadOnly] = useState();
    const [allPatients, setAllPatients] = useState([]);
    const [illnesses, setIllnesses] = useState([]);
    
    dayjs.extend(utc);
    dayjs.extend(timezone);
    // Set the time zone to Warsaw (CET)
    dayjs.tz.setDefault('Europe/Warsaw');
    dayjs.locale('en');
    useEffect(() => {
        setReadOnly();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [patients] = await Promise.all([
              allPatientsRequest(),
            ]);
            setAllPatients(patients);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        const fetchIllnessesData = async () => {
          try {
            const [illnesses] = await Promise.all([
              illnessesRequest(),
            ]);
            setIllnesses(illnesses);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchIllnessesData();
      }, []);

      useEffect(() => {
        if (initialValues) {
          setFormValues(initialValues);
        }
    
      }, [initialValues]);


      const handleChange = async (e) => {
        if (!readOnly) {
            const { name, value } = e.target;
            setFormValues((prevFormValues) => ({
              ...prevFormValues,
              [name]: value,
            }));
          }
      };

      const handleDateChange = (newValue) => {
        if (!readOnly) {
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            illness_onset_date: newValue ? newValue.format('YYYY-MM-DD') : null,
          }));
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        await onSubmit(formValues);
        onClose();
        window.location.reload();
      };

      return (
        <div className="popup-form">        
        <h2>Formularz choroby</h2>
        <form onSubmit={handleSubmit} className="form-sections">
        <div className="form-section">
            <label>
                <h3>Choroba</h3>
                <select
                    name="illness_history_illness_id"
                    value={formValues.illness_history_illness_id}
                    onChange={handleChange}
                >
                    <option value="">Select illness</option>
                    {illnesses.map((illness) => (
                        <option key={illness.id} value={illness.id}>
                            {illness.illness_name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
        <div className="form-section">
            <label>
                <h3>Pacjent</h3>
                <select
                    name="illness_history_patient_id"
                    value={formValues.illness_history_patient_id}
                    disabled={initialValues}
                >
                    <option value="">Select Patient</option>
                    {allPatients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {patient.patient_name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
        <div className="form-section">
            <label>
                <h3>Data wystąpienia choroby:</h3>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        name="illness_onset_date"
                        format='YYYY-MM-DD'
                        value={dayjs(formValues.illness_onset_date)}
                        onChange={handleDateChange}
                        disabled={!!readOnly}
                        dayOfWeekFormatter={(_day, weekday) => `${weekday.format('dd')}`}
                    />
                </LocalizationProvider>
            </label>
        </div>
    </form>
    <div className="button-container">
        {readOnly || <button className="form-button" onClick={handleSubmit} type="submit">Zatwierdź</button>}
        <button className="form-button" onClick={onClose}>Zamknij</button>
      </div>
      
        </div>
      );
};

export default IllnessHistoryForm;