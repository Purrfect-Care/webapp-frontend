import React from "react";
import "./AddPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavigationPopup from "../../components/NavigationPopup/NavigationPopup";

const AddPage = () => {
  return (
    <div className="addPage">
      <Sidebar />
      <div className="mainPart">
        <div className="addPageNav">
            <NavigationPopup />
        </div>
      </div>
    </div>
  );
};

export default AddPage;
