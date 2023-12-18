import React, { useState } from "react";

const PhotoAddPopup = ({ onAdd, onClose, visitId, isFormOpen }) => {
  const [newPhoto, setNewPhoto] = useState({
    image: null,
    photo_description: "",
    photos_visit_id: visitId,
  });

  const handleDescriptionChange = (e) => {
    setNewPhoto({
      ...newPhoto,
      photo_description: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPhoto({
      ...newPhoto,
      image: file,
    });
  };

  const handleAdd = () => {
    onAdd(newPhoto);
  };

  return (
      <div className="photo-add-popup">
        <form
          onSubmit={handleAdd}
          encType="multipart/form-data"
          className="form-sections-change-photo"
        >
          <div className="form-section-change-photo">
            <h3 className="text-3xl font-semibold mt-7 mb-7 text-emerald-600 text-center">
              Zmiana zdjęcia pacjenta
            </h3>            
            <div className="container-change-photo">
              <label>
                Zdjęcie:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="change-photo"
                  name="image"
                />
              </label>
              <label>
                Opis:
                <input
                  type="text"
                  value={newPhoto.photo_description}
                  onChange={handleDescriptionChange}
                  name="photo_description"
                />
              </label>
              <div className="button-container-change-photo">
                <button
                  type="submit"
                  onClick={onClose}
                  className="submit-button-change-photo"
                >
                  Zatwierdź
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="submit-button-change-photo"
                >
                  Anuluj
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
};

export default PhotoAddPopup;
