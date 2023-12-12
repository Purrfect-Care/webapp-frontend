import React, { useState, useEffect } from 'react';
import { ownerByIdRequest, editOwnerRequest } from '../../api/ownerRequests';
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
  const [isFormOpen, setIsFormOpen] = useState(isOpen);

  const [focusedFirstName, setFocusedFirstName] = useState(false);
  const [focusedLastName, setFocusedLastName] = useState(false);
  const [focusedAddress, setFocusedAddress] = useState(false);
  const [focusedPostcode, setFocusedPostcode] = useState(false);
  const [focusedCity, setFocusedCity] = useState(false);
  const [focusedPhoneNumber, setFocusedPhoneNumber] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ownerByIdRequest(ownerId);
        setEditedData(data);
      } catch (error) {
        console.error('Error fetching owner data:', error.message);
      }
    };

    if (isOpen && ownerId) {
      fetchData();
    }
  }, [isOpen, ownerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "owner_postcode" && value.length <= 6) {
      setEditedData((prevData) => ({ ...prevData, [name]: value.replace(/[^0-9]/g, "").replace(/(\d{2})(\d{0,2})/, "$1-$2") }));
    } else if (name === "owner_phone_number" && value.length <= 9) {
      setEditedData((prevData) => ({ ...prevData, [name]: value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}));
    } else {
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const handleClose = () => {
    setIsFormOpen(false);
    onClose();
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const requiredFields = ['owner_first_name', 'owner_last_name', 'owner_address', 'owner_postcode', 'owner_city', 'owner_phone_number', 'owner_email'];
  const isEmptyField = requiredFields.some(field => !editedData[field]);
  try {
  if (isEmptyField) {
      // Display an error message or take appropriate action
      setErrorMessage('Wypełnij wszystkie wymagane pola.');
      return;
    }
    const updatedOwnerData = await editOwnerRequest(ownerId, editedData);
  } catch (error) {
    console.error('Error updating owner data:', error.message);
  }
  onClose();

};

  const handleFocusFirstName = (e) => setFocusedFirstName(true);
  const handleFocusLastName = (e) => setFocusedLastName(true);
  const handleFocusAddress = (e) => setFocusedAddress(true);
  const handleFocusPostcode = (e) => setFocusedPostcode(true);
  const handleFocusCity = (e) => setFocusedCity(true);
  const handleFocusPhoneNumber = (e) => setFocusedPhoneNumber(true);
  const handleFocusEmail = (e) => setFocusedEmail(true);
  

return (
<div>
<div className={`overlay-edit-owner-form ${isFormOpen ? 'active' : ''}`}></div>

<div style={{ display: isOpen ? 'block' : 'none', zIndex: '1000',position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid #ccc', padding: '40px', backgroundColor: '#fff',  width: '50vh', height:'50vh' }}>    

<div className="popup-form-edit-owner">
      <h2 style={{marginBottom : '2vh'}}>Formularz edycji danych właściciela</h2>
      <form onSubmit={handleSubmit} className="form-sections-edit-owner">
        <div className="form-section-edit-owner">
          <div>
          <label>
            Imię:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_first_name"
              value={editedData.owner_first_name}
              onChange={handleInputChange}
              required="true"
              onBlur={handleFocusFirstName}
              focused={focusedFirstName.toString()}
            />
            <span className='span-editowner'>Należy podać imię właściciela</span>
          </label>
          </div>
          
          <div>
          <label>
            Nazwisko:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_last_name"
              value={editedData.owner_last_name}
              onChange={handleInputChange}
              required="true"
              onBlur={handleFocusLastName}
              focused={focusedLastName.toString()}
            />
            <span className='span-editowner'>Należy podać nazwisko właściciela</span>
          </label>
          </div>
          
          <div>
          <label>
            Adres:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_address"
              value={editedData.owner_address}
              onChange={handleInputChange}
              required="true"
              onBlur={handleFocusAddress}
              focused={focusedAddress.toString()}
            />
            <span className='span-editowner'>Należy podać adres właściciela</span>
          </label>
          </div>
          
          <div>
          <label>
            Kod pocztowy:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_postcode"
              value={editedData.owner_postcode}
              onChange={handleInputChange}
              required="true"
              onBlur={handleFocusPostcode}
              focused={focusedPostcode.toString()}
            />
            <span className='span-editowner'>Należy podać kod pocztowy właściciela</span>
          </label>
          </div>
          
          <div>
          <label>
            Miasto:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_city"
              value={editedData.owner_city}
              onChange={handleInputChange}
              required="true"
              onBlur={handleFocusCity}
              focused={focusedCity.toString()}
            />
            <span className='span-editowner'>Należy podać miasto właściciela</span>
          </label>
          </div>
          
          <div>
          <label>
            Numer telefonu:
            <input
              className="input-edit-owner"
              type="text"
              name="owner_phone_number"
              value={editedData.owner_phone_number}
              onChange={handleInputChange}
              required="true"
              onBlur={handleFocusPhoneNumber}
              focused={focusedPhoneNumber.toString()}
            />
            <span className='span-editowner'>Należy podać numer telefonu właściciela</span>
          </label>
          </div>
          
          <div>
          <label>
            Email:
            <input
              className="input-edit-owner"
              type="email"
              name="owner_email"
              value={editedData.owner_email}
              onChange={handleInputChange}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required="true"
              onBlur={handleFocusEmail}
              focused={focusedEmail.toString()}
            />
            <span className='span-editowner'>Należy podać email właściciela</span>
          </label>
          </div>
          
        </div>
        {errorMessage &&  <span className='span-editowner-error'>{errorMessage}</span>}

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
</div>
);
};

export default EditOwnerForm;
