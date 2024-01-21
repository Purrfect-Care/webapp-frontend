import React, { useState } from "react";
import "./updatePhoto.css";

const PhotoEditPopup = ({ photo, onSubmit, onClose, isFormOpen }) => {
  const [photoData, setPhotoData] = useState({
    image: null,
    photo_description: photo.photo_description,
    id: photo.id,
    photos_visit_id: photo.photos_visit_id,
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setPhotoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(photoData);
  };

  return (
    <>
      <div className={`overlay-photo-form ${isFormOpen ? "active" : ""}`}></div>
      <div className="photo-add-popup">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="form-sections-change-photo"
        >
          <div className="form-section-change-photo">
            <h3 className="text-3xl font-semibold mt-7 mb-7 text-emerald-600 text-center">
              Edytuj zdjęcie
            </h3>
            <div className="form-section-row-visit">
              <div className="form-section-column-visit photo-column">
                <label>
                  Wybierz nowe zdjęcie (opcjonalnie)
                  <div>
                    <input
                      className="input-visitform-image"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </label>
              </div>
              <div className="form-section-column-visit">
                <label>
                  Opis zdjęcia
                  <div>
                    <textarea
                      name="photo_description"
                      value={photoData.photo_description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="button-container-visit">
            <button
              className="form-button-visit"
              onClick={handleSubmit}
              type="submit"
            >
              Zatwierdź
            </button>
            <button className="form-button-visit" onClick={onClose}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PhotoEditPopup;
