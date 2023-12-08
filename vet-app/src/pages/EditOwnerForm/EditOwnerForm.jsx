import React, { useState, useEffect } from 'react';
import './EditOwnerForm.css';

const EditOwnerForm = ({ isOpen, ownerId, existingData, onClose}) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log(editedData);
    const response = await fetch(`http://127.0.0.1:8000/api/owners/${ownerId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update owner data: ${await response.text()}`);
    }

    if (response.ok) {
      console.log('Owner data updated successfully');
      window.location.reload();
    } else {
      console.error(`Failed to update owner data: ${await response.text()}`);
    }
  } catch (error) {
    console.error('Error updating owner data:', error.message);
  }
  onClose();

};


return (
<div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid #ccc', padding: '40px', backgroundColor: '#fff',  width: '50vh', height:'50vh' }}>    
<div className="popup-form-edit-owner">
      <h2 style={{marginBottom : '2vh'}}>Formularz edycji danych właściciela</h2>
      <form onSubmit={handleSubmit} className="form-sections-edit-owner">
        <div className="form-section-edit-owner">
          <label>
            Imię:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_first_name"
              value={editedData.owner_first_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Nazwisko:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_last_name"
              value={editedData.owner_last_name}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Adres:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_address"
              value={editedData.owner_address}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Kod pocztowy:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_postcode"
              value={editedData.owner_postcode}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Miasto:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_city"
              value={editedData.owner_city}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Numer telefonu:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_phone_number"
              value={editedData.owner_phone_number}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Email:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_email"
              value={editedData.owner_email}
              onChange={handleInputChange}
            />
          </label>
        </div>

      </form>
      <div className="button-container-edit-owner">
        <button className="edit-owner-button-form" onClick={handleSubmit} type="submit">
          Zapisz zmiany
        </button>

        <button className="edit-owner-button-form" type="button" onClick={onClose}>
          Anuluj
        </button>
      </div>
    </div>
  </div>
);
};

export default EditOwnerForm;
