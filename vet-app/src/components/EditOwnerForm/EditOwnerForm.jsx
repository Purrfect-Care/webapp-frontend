import React, { useState, useEffect } from 'react';
import './EditOwnerForm.css';

const EditOwnerForm = ({ isOpen, ownerId, existingData, onClose }) => {
  const initialData = existingData || {
    owner_first_name: '',
    owner_last_name: '',
    owner_address: '',
    owner_postcode: '',
    owner_city: '',
    owner_phone_number: '',
    owner_email: '',
  };

  const [editedData, setEditedData] = useState(initialData);

  useEffect(() => {
    setEditedData(existingData || initialData);
  }, [existingData, initialData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data
    console.log('Form submitted with data:', editedData);
    // Close the form
    onClose();
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid #ccc', padding: '40px', backgroundColor: '#fff', zIndex: '1000' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='owner-label'>Imię:</label>
          <input type="text" name="owner_first_name" value={editedData.owner_first_name} onChange={handleInputChange} />
        </div>
        <div>
          <label className='owner-label'>Nazwisko:</label>
          <input type="text" name="owner_last_name" value={editedData.owner_last_name} onChange={handleInputChange} />
        </div>
        <div>
          <label className='owner-label'>Adres:</label>
          <input type="text" name="owner_address" value={editedData.owner_address} onChange={handleInputChange} />
        </div>
        <div>
          <label className='owner-label'>Kod pocztowy:</label>
          <input type="text" name="owner_postcode" value={editedData.owner_postcode} onChange={handleInputChange} />
        </div>
        <div>
          <label className='owner-label'>Miasto:</label>
          <input type="text" name="owner_city" value={editedData.owner_city} onChange={handleInputChange} />
        </div>
        <div>
          <label className='owner-label'>Numer telefonu:</label>
          <input type="text" name="owner_phone_number" value={editedData.owner_phone_number} onChange={handleInputChange} />
        </div>
        <div>
          <label className='owner-label'>Email:</label>
          <input type="text" name="owner_email" value={editedData.owner_email} onChange={handleInputChange} />
        </div>
        <div className="button-container">
          <button className="edit-owner-button" type="submit">Zapisz zmiany</button>
          
          <button className="edit-owner-button" type="button" onClick={onClose}>Anuluj</button>
        </div>
      </form>
      </div>
  );
};

export default EditOwnerForm;
