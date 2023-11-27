// ConfirmationPopup.jsx
import React from 'react';
import './ConfirmationPopup.css'; // Import your CSS file for styling

const ConfirmationPopup = ({ message, onConfirm, onCancel, onYes, onNo }) => {
  return (
    <div className="confirmation-popup-overlay">
      <div className="confirmation-popup">
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-buttons">
          <button className="confirmation-ok" onClick={onConfirm}>
            {onYes}
          </button>
          <button className="confirmation-cancel" onClick={onCancel}>
            {onNo}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
