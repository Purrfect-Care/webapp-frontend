import React, { useEffect, useState } from 'react';
import { createOwnerRequest, editOwnerRequest } from '../../../api/ownerRequests'; // Make sure to import your API request function
import './AddOwner.css'; // Add your CSS file import
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddOwner = ({initialValues, onClose}) => {
  const [formValues, setFormValues] = useState({
    owner_first_name: '',
    owner_last_name: '',
    owner_address: '',
    owner_postcode: '',
    owner_city: '',
    owner_phone_number: '',
    owner_email: '',
  });

  useEffect(() => {
    const updateFormValues = async () => {
      if (initialValues) {
        setFormValues(initialValues);
      }
    }
    updateFormValues();
  }, [initialValues]);

  const [focusedFirstName, setFocusedFirstName] = useState(false);
  const [focusedLastName, setFocusedLastName] = useState(false);
  const [focusedAddress, setFocusedAddress] = useState(false);
  const [focusedPostcode, setFocusedPostcode] = useState(false);
  const [focusedCity, setFocusedCity] = useState(false);
  const [focusedPhoneNumber, setFocusedPhoneNumber] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
    const requiredFields = ['owner_first_name', 'owner_last_name', 'owner_address', 'owner_postcode', 'owner_city', 'owner_phone_number', 'owner_email'];
    const isEmptyField = requiredFields.some(field => !formValues[field]);
    
    if (isEmptyField) {
      // Display an error message or take appropriate action
      setErrorMessage('Wypełnij wszystkie wymagane pola.');
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (initialValues){
        const response = await editOwnerRequest(initialValues.id, formValues);
        console.log('Owner edited successfully', response);
        onClose();
      } else {

        console.log(formValues);
        const response = await createOwnerRequest(formData);
        console.log('Owner added successfully', response);
        openSnackbar('success', 'Właściciel dodany pomyślnie!');
        setTimeout(() => {
          navigate(`/calendar`, { replace: true });
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error.message);
      openSnackbar('error', 'Błąd podczas dodawania właściciela.');

    }
  };

  const handleFocusFirstName = (e) => setFocusedFirstName(true);
  const handleFocusLastName = (e) => setFocusedLastName(true);
  const handleFocusAddress = (e) => setFocusedAddress(true);
  const handleFocusPostcode = (e) => setFocusedPostcode(true);
  const handleFocusCity = (e) => setFocusedCity(true);
  const handleFocusPhoneNumber = (e) => setFocusedPhoneNumber(true);
  const handleFocusEmail = (e) => setFocusedEmail(true);
  
  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <div className="add-owner">
      <Sidebar />
      <div className="owner-form">
        {/* <h2 style={{ marginBottom: '3vh', marginLeft: '15vh' }}>Formularz dodawania właściciela</h2> */}
        <h3 className="text-3xl font-semibold mt-10 mb-10 text-emerald-600">
              Formularz dodawania nowego właściciela
            </h3>
        <form onSubmit={handleSubmit}>
          <label>
          <input
            className="input-owner-form"
            type="text"
            name="owner_first_name"
            value={formValues.owner_first_name}
            placeholder="Imię"
            onChange={handleInputChange}
            required="true"
            onBlur={handleFocusFirstName}
            focused={focusedFirstName.toString()}
          />
          <span className='span-addowner'>Należy podać imię właściciela</span>
          </label>
          
          <label>
          <input
            className="input-owner-form"
            type="text"
            name="owner_last_name"
            value={formValues.owner_last_name}
            placeholder="Nazwisko"
            onChange={handleInputChange}
            required="true"
            onBlur={handleFocusLastName}
            focused={focusedLastName.toString()}
          />
          <span className='span-addowner'>Należy podać nazwisko właściciela</span>
          </label>
          <label>
          <input
            className="input-owner-form"
            type="text"
            name="owner_address"
            value={formValues.owner_address}
            placeholder="Adres"
            onChange={handleInputChange}
            required="true"
            onBlur={handleFocusAddress}
            focused={focusedAddress.toString()}
          />
          <span className='span-addowner'>Należy podać adres właściciela</span>
          </label>
          
          <label>
          <input
            className="input-owner-form"
            type="text"
            name="owner_postcode"
            value={formValues.owner_postcode}
            placeholder="Kod pocztowy"
            onChange={handleInputChange}
            required="true"
            onBlur={handleFocusPostcode}
            focused={focusedPostcode.toString()}
          />
          <span className='span-addowner'>Należy podać kod pocztowy właściciela</span>
          </label>
          
          <label>
          <input
            className="input-owner-form"
            type="text"
            name="owner_city"
            value={formValues.owner_city}
            placeholder="Miasto"
            onChange={handleInputChange}
            required="true"
            onBlur={handleFocusCity}
            focused={focusedCity.toString()}
          />
          <span className='span-addowner'>Należy podać miasto właściciela</span>
          </label>

          <label>
          <input
            className="input-owner-form"
            type="text"
            name="owner_phone_number"
            value={formValues.owner_phone_number}
            placeholder="Numer telefonu"
            onChange={handleInputChange}
            required="true"
            onBlur={handleFocusPhoneNumber}
            focused={focusedPhoneNumber.toString()}
          />
          <span className='span-addowner'>Należy podać numer telefonu właściciela</span>
          </label>
          <label>
          <input
            className="input-owner-form"
            type="email"
            name="owner_email"
            value={formValues.owner_email}
            placeholder="Email"
            onChange={handleInputChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required="true"
            onBlur={handleFocusEmail}
            focused={focusedEmail.toString()}
          />
          <span className='span-addowner'>Należy podać email właściciela we właściwym formacie</span>
          </label>
          {errorMessage &&  <span className='span-addowner-error'>{errorMessage}</span>}


          <div className="button-container-add-owner">
            {!initialValues && <button type="submit" className="submit-button-add-owner">
              Dodaj właściciela
            </button>}
            {initialValues && <button type="submit" className="submit-button-update-owner">
              Edytuj właściciela
            </button>}
            {initialValues && <button className="cancel-button-owner" onClick={() => onClose()}>
              Anuluj
            </button>}
          </div>
        </form>
      </div>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
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
    </div>
  );
};

export default AddOwner;
