import React, { useState, useEffect } from 'react';
import { illnessesRequest } from '../../api/illnessHistoryRequests';
import { patientRequest } from '../../api/patientsRequests';
import './IllnessHistoryForm.css';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import utc from 'dayjs/plugin/utc'; 
import timezone from 'dayjs/plugin/timezone';

const IllnessHistoryForm = ({isOpen, onClose, initialValues, onSubmit}) => {
    const [formValues, setFormValues] = useState({
            illness_onset_date: null,
            illness_history_patient_id: null, 
            illness_history_illness_id: null,    
    });
    const [readOnly, setReadOnly] = useState();
    const [illnesses, setIllnesses] = useState([]);
    const [patientData, setPatient] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(true);

    dayjs.extend(utc);
    dayjs.extend(timezone);
    // Set the time zone to Warsaw (CET)
    dayjs.tz.setDefault('Europe/Warsaw');
    dayjs.locale('en');
    useEffect(() => {
        setReadOnly();
    }, []);

      useEffect(() => {
        const fetchIllnessesData = async () => {
          try {
            const [illnesses, patient] = await Promise.all([
              illnessesRequest(),
              patientRequest(initialValues.illness_history_patient_id),
            ]);
            setIllnesses(illnesses);
            setPatient(patient);
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

      const handleClose = () => {
        setIsFormOpen(false);
        onClose();
      };

      return (
        <div>
          <div className={`overlay-illness-history-form ${isFormOpen ? 'active' : ''}`} onClick={handleClose}></div>

          <div className="popup-form-illness-history">        
        <h2>Formularz choroby</h2>
        <form onSubmit={handleSubmit} className="form-sections-illness-history">
        <div className="form-section-illness-history">
            <label>
                <h3>Pacjent</h3>
                <p className='illnessform-patient'>{patientData.patient_name}</p>
            </label>
        </div>
        <div className="form-section-illness-history">
            <label>
                <h3>Choroba</h3>
                <select
                    name="illness_history_illness_id"
                    value={formValues.illness_history_illness_id}
                    onChange={handleChange}
                >
                    <option value="">Wybierz chorobę</option>
                    {illnesses.map((illness) => (
                        <option key={illness.id} value={illness.id}>
                            {illness.illness_name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
        <div className="form-section-illness-history">
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
    <div className="button-container-illness-history">
        {readOnly || <button className="form-button-illness-history" onClick={handleSubmit} type="submit">Zatwierdź</button>}
        <button className="form-button-illness-history" onClick={onClose}>Zamknij</button>
      </div>
      
        </div>

        </div>
        
      );
};

export default IllnessHistoryForm;