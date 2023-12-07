import React, { useState, useEffect } from 'react';
import { allPatientsRequest } from '../api/patientsRequests';
import { addPrescribedMedicationRequest, addPrescriptionRequest } from '../api/prescriptionRequests';
import { allMedicationsRequest } from '../api/medicationsRequest'; // Assuming you have an API endpoint for fetching medications
import { patientRequest } from '../api/patientsRequests';
import { FaPlus, FaTrash } from 'react-icons/fa';
import './PrescriptionForm.css';



const PrescriptionForm = ({ onClose, onSubmit, initialPrescriptionValues }) => {
  const MAX_MEDICATIONS = 5;

  const [formValues, setFormValues] = useState({
    prescription_date: new Date().toISOString().split('T')[0],
    prescriptions_patient_id: initialPrescriptionValues.prescriptions_patient_id,
    prescribed_medications: Array.from({ length: 1 }, () => ({
      medication_id: '',
      medication_amount: 1,
    })),
  });

  const [allPatients, setAllPatients] = useState([]);
  const [allMedications, setAllMedications] = useState([]);
  const [patientData, setPatient] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patients, medications] = await Promise.all([
          allPatientsRequest(),
          allMedicationsRequest(),
        ]);

        if (initialPrescriptionValues.prescriptions_patient_id != null) {
          const patientJSON = await patientRequest(initialPrescriptionValues.prescriptions_patient_id);
          setPatient(patientJSON);
        }

        setAllPatients(patients);
        setAllMedications(medications);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMedications = [...formValues.prescribed_medications];
    updatedMedications[index][name] = name === 'medication_amount' ? Math.max(1, Math.min(5, parseInt(value, 10))) : value;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      prescribed_medications: updatedMedications,
    }));
  };

  const handleAddMedication = () => {
    if (formValues.prescribed_medications.length < MAX_MEDICATIONS) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        prescribed_medications: [...prevFormValues.prescribed_medications, { medication_id: '', medication_amount: 1 }],
      }));
    }
  };

  const handleRemoveMedication = (index) => {
    const updatedMedications = [...formValues.prescribed_medications];
    updatedMedications.splice(index, 1);

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      prescribed_medications: updatedMedications,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { prescription_date, prescriptions_patient_id } = formValues;
      const prescriptions_employee_id = JSON.parse(localStorage.getItem('employeeData')).id.toString();

      const addedPrescription = await addPrescriptionRequest({
        prescription_date,
        prescriptions_patient_id,
        prescriptions_employee_id,
      });

      const prescribedMedicationsData = formValues.prescribed_medications.map((medication) => ({
        medication_amount: medication.medication_amount,
        prescribed_medications_prescription_id: addedPrescription.id,
        prescribed_medications_medication_id: medication.medication_id,
      }));

      await Promise.all(prescribedMedicationsData.map(addPrescribedMedicationRequest));

      console.log('Prescription and medications added successfully!');
      window.location.href = `/patients/${formValues.prescriptions_patient_id}`;

    } catch (error) {
      console.error('Error submitting prescription:', error.message);
      // Handle error as needed
    }
  };
  const handleClose = () => {
    setIsFormOpen(false);
    onClose();
  };

  return (
    <div>
       <div className={`overlay-prescription-form ${isFormOpen ? 'active' : ''}`} onClick={handleClose}></div>
    <div className="popup-form-pres">
      <h2>Formularz recepty</h2>
      <form onSubmit={handleSubmit} className="form-sections-prescription-form">
        <div className='form-section-patient-prescription'>
        <label className='prescription-patient-label'>
          Pacjent
        </label>
        <p className="patient-name-prescription">{patientData.patient_name}</p>
          {!initialPrescriptionValues.prescriptions_patient_id && (
            <select
              className='select-prescriptionform'
              name="prescriptions_patient_id"
              value={formValues.prescriptions_patient_id}
              onChange={(e) => setFormValues((prevFormValues) => ({ ...prevFormValues, prescriptions_patient_id: e.target.value }))}
            >
              <option value="">Wybierz pacjenta</option>
              {allPatients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.patient_name} • {patient.patients_owner.owner_first_name} {patient.patients_owner.owner_last_name}
                </option>
              ))}
            </select>
          )}

        </div>
        <div className='form-section-medication'>
        {formValues.prescribed_medications.map((medication, index) => (
          <div key={index} className='medication-space'>
            <label className='medication-name-pres'>
              Lek:
              <select
                className='select-prescriptionform'
                name="medication_id"
                value={medication.medication_id}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="">Wybierz lek</option>
                {allMedications.map((med) => (
                  <option key={med.id} value={med.id}>
                    {med.medication_name}
                  </option>
                ))}
              </select>
            </label>
            <label className='medication-amount-pres'>
              Ilość:
              <input
                className='input-prescriptionform'
                type="number"
                name="medication_amount"
                value={medication.medication_amount}
                onChange={(e) => handleChange(e, index)}
                min="1"
                max="5"
              />
            </label>
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveMedication(index)} className='delete-medication'>
                <FaTrash />
              </button>
            )}
          </div>
        ))}

        </div>

        <button type="button" onClick={handleAddMedication} className='add-medication'>
          <FaPlus />
        </button>

        <div className="button-container-prescription-form">
          <button className="form-button-prescription-form" type="submit">
            Zatwierdź
          </button>
          <button className="form-button-prescription-form" onClick={onClose}>
            Zamknij
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default PrescriptionForm;