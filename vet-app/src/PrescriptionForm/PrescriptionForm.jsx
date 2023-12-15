import React, { useState, useEffect } from 'react';
import { allPatientsRequest } from '../api/patientsRequests';
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
      medication_dosage: '',
    })),
  });

  const [allPatients, setAllPatients] = useState([]);
  const [allMedications, setAllMedications] = useState([]);
  const [patientData, setPatient] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [focusedPatient, setFocusedPatient] = useState(false);
  const [focusedMecidation, setFocusedMedication] = useState(false);

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

  const sortedPatients = allPatients.slice().sort((a, b) => {
    const nameA = a.patient_name.toLowerCase();
    const nameB = b.patient_name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMedications = [...formValues.prescribed_medications];
    updatedMedications[index][name] = name === 'medication_amount' ? Math.max(1, Math.min(5, parseInt(value, 10))) : value;
    
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      prescribed_medications: updatedMedications,
    }));
    console.log('handlechange: ', updatedMedications);
  };

  const handleAddMedication = () => {
    if (formValues.prescribed_medications.length < MAX_MEDICATIONS) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        prescribed_medications: [...prevFormValues.prescribed_medications, { medication_id: '', medication_amount: 1, medication_dosage: '' }],
      }));
      console.log('handleaddmedication: ', formValues);
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
    console.log('handlesubmith: ', formValues);
    await onSubmit(formValues);
  };
  const handleClose = () => {
    setIsFormOpen(false);
    onClose();
  };

  const handleFocusPatient = (e) => {
    setFocusedPatient(true);
  }
  const handleFocusMedication = (e) => {
    setFocusedMedication(true);
  }

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
            <div className="input-wrapper">
              <p className="patient-name-prescription">{patientData.patient_name}</p>
              {!initialPrescriptionValues.prescriptions_patient_id && (
                <>
                  <select
                    className='select-prescriptionform'
                    name="prescriptions_patient_id"
                    value={formValues.prescriptions_patient_id}
                    onChange={(e) => setFormValues((prevFormValues) => ({ ...prevFormValues, prescriptions_patient_id: e.target.value }))}
                    required="true"
                    onBlur={handleFocusPatient}
                    focused={focusedPatient.toString()}
                  >
                    <option value="">Wybierz pacjenta</option>
                    {sortedPatients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.patient_name} • {patient.patients_owner.owner_first_name} {patient.patients_owner.owner_last_name}
                      </option>
                    ))}
                  </select>
                  <span className='span-prescriptionform'>Należy wybrać pacjenta</span>
                </>
              )}
            </div>

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
                    required="true"
                    onBlur={handleFocusMedication}
                    focused={focusedMecidation.toString()}
                  >
                    <option value="">Wybierz lek</option>
                    {allMedications.map((med) => (
                      <option key={med.id} value={med.id}>
                        {med.medication_name}
                      </option>
                    ))}
                  </select>
                  <span className='span-prescriptionform'>Należy wybrać lek</span>
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
                  <label className='medication-dosage-pres'>
                  Dawkowanie:
                  <input
                    className='input-prescriptionform'
                    type="text"
                    name="medication_dosage"
                    value={medication.medication_dosage}
                    onChange={(e) => handleChange(e, index)}
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