import React, { useState } from 'react';
import { createOwnerRequest } from '../../../api/ownerRequests'; // Make sure to import your API request function
import './AddOwner.css'; // Add your CSS file import
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const AddOwner = () => {
  const [formValues, setFormValues] = useState({
    owner_first_name: '',
    owner_last_name: '',
    owner_address: '',
    owner_postcode: '',
    owner_city: '',
    owner_phone_number: '',
    owner_email: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "owner_postcode" && value.length <= 6) {
      setFormValues({ ...formValues, [name]: value.replace(/[^0-9]/g, "").replace(/(\d{2})(\d{0,2})/, "$1-$2") });
    } else if (name === "owner_phone_number" && value.length <= 9) {
      setFormValues({ ...formValues, [name]: value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")});
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log(formValues);
      const response = await createOwnerRequest(formData);
      console.log('Owner added successfully', response);
      navigate(`/calendar`, { replace: true });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="add-owner">
      <Sidebar />
      <div className="owner-form">
        <h2 style={{ marginBottom: '3vh', marginLeft: '15vh' }}>Formularz dodawania właściciela</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-owner-form"
            type="text"
            name="owner_first_name"
            value={formValues.owner_first_name}
            placeholder="Imię"
            onChange={handleInputChange}
            required
          />

          <input
            className="input-owner-form"
            type="text"
            name="owner_last_name"
            value={formValues.owner_last_name}
            placeholder="Nazwisko"
            onChange={handleInputChange}
            required
          />

          <input
            className="input-owner-form"
            type="text"
            name="owner_address"
            value={formValues.owner_address}
            placeholder="Adres"
            onChange={handleInputChange}
            required
          />

          <input
            className="input-owner-form"
            type="text"
            name="owner_postcode"
            value={formValues.owner_postcode}
            placeholder="Kod pocztowy"
            onChange={handleInputChange}
            required
          />

          <input
            className="input-owner-form"
            type="text"
            name="owner_city"
            value={formValues.owner_city}
            placeholder="Miasto"
            onChange={handleInputChange}
            required
          />

          <input
            className="input-owner-form"
            type="text"
            name="owner_phone_number"
            value={formValues.owner_phone_number}
            placeholder="Numer telefonu"
            onChange={handleInputChange}
            required
          />

          <input
            className="input-owner-form"
            type="text"
            name="owner_email"
            value={formValues.owner_email}
            placeholder="Email"
            onChange={handleInputChange}
            required
          />

          <div className="button-container-add-owner">
            <button type="submit" className="submit-button-add-owner">
              Dodaj właściciela
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOwner;
