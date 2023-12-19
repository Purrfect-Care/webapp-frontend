import React, { useState } from "react";
import "./addVisitPhoto.css";
import { FaTrash, FaPlus } from "react-icons/fa";

const PhotoAddPopup = ({ onSubmit, onClose, visitId, isFormOpen }) => {
  const [photos, setPhotos] = useState([{ image: null, photo_description: '', id: null, photos_visit_id: visitId}]);
  const [errorMessage, setErrorMessage] = useState("");

  const addPhotoField = () => {
    setPhotos((prevPhotos) => [
      ...prevPhotos,
      { image: null, photo_description: "", id: null, photos_visit_id: visitId },
    ]);
  };

  const removePhotoField = (index) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos.splice(index, 1);
      return updatedPhotos;
    });
  };

  const handlePhotoChange = (index, e) => {
    const file = e.target.files[0];
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[index].image = file;
      return updatedPhotos;
    });
  };

  const handleDescriptionChange = (index, e) => {
    const { name, value } = e.target;
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[index].photo_description = value;
      return updatedPhotos;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPhotoEmpty = photos.some((photo) => !photo.image);

    if (isPhotoEmpty) {
      setErrorMessage("Wypełnij wszystkie wymagane pola.");
      return;
    }
    await onSubmit(photos);
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
              Dodaj zdjęcia do wizyty
            </h3>
            <div className="form-section-row-visit">
              {photos.map((photo, index) => (
                <>
                  <div className="form-section-column-visit photo-column">
                    <label>
                      Wybierz zdjęcie (wymagane)
                      <div>
                        <input
                          className="input-visitform-image"
                          type="file"
                          accept="image/*"
                          name={"image"}
                          onChange={(e) => handlePhotoChange(index, e)}
                          required="true"
                        />
                        <span className="span-visitform">
                          Należy wybrać zdjęcie
                        </span>
                      </div>
                    </label>
                    <div>
                      &zwnj;
                      <div>
                        <button
                          className="delete-photo-row"
                          type="button"
                          onClick={() => removePhotoField(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-section-column-visit">
                    <label>
                      Opis zdjęcia
                      <div>
                        <textarea
                          name={`photo_description`}
                          onChange={(e) => handleDescriptionChange(index, e)}
                          value={photo.photo_description}
                        />
                      </div>
                    </label>
                  </div>
                </>
              ))}
              <button
                className="add-photo-row"
                type="button"
                onClick={addPhotoField}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="button-container-visit">
            {errorMessage && (
              <span className="span-visitform-error">{errorMessage}</span>
            )}
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

export default PhotoAddPopup;
