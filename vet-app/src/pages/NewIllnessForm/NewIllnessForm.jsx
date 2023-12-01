import React, { useState, useEffect } from 'react';
import { createIllnessRequest } from '../../api/illnessRequests'; 
import './NewIllnessForm.css';

const IllnessForm = ({ isOpen, onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    illness_name: '',
  });

  const [readOnly, setReadOnly] = useState(false); 

  useEffect(() => {
    setReadOnly(false);
  }, []);

  const handleChange = (e) => {
    if (!readOnly) {
      const { name, value } = e.target;
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
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
      <h2>Formularz dodawania nowej choroby</h2>
      <form onSubmit={handleSubmit} className="form-sections">
        <div className="form-section">
          <label>
            <h3>Nazwa Choroby</h3>
            <input
              type="text"
              name="illness_name"
              value={formValues.illness_name}
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
      <div className="button-container">
        {readOnly || (
          <button className="form-button" onClick={handleSubmit} type="submit">
            Zatwierdź
          </button>
        )}
        <button className="form-button" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default IllnessForm;
