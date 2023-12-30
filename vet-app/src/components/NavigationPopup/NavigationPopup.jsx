import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NavigationPopup.css";
import * as AiIcons from "react-icons/ai";

const PopupComponent = ({ message, buttonNames, urls }) => {
  let navigate = useNavigate();

  const handleButtonClick = (url) => {
    navigate(url);
  };

  return (
    <div className="navigationPopup-overlay">
      <div className="popup-content">
        <span className="top-popup">
          <div className="w-8">
            <Link to="/calendar">
              <AiIcons.AiOutlineClose className="text-2xl" />
            </Link>
          </div>
          <p className="navigation-message">{message}</p>
        </span>
        <div className="nav-buttons">
          {buttonNames.slice(0, 5).map((buttonName, index) => (
            <button key={index} onClick={() => handleButtonClick(urls[index])}>
              {buttonName}
            </button>
          ))}
        </div>
        <div className="nav-buttons">
          {buttonNames.slice(5).map((buttonName, index) => (
            <button key={index + 5} onClick={() => handleButtonClick(urls[index + 5])}>
              {buttonName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
