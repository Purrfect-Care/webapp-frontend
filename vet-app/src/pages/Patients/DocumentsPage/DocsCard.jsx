import React from "react";
import "./DocsCard.css";
import * as GrIcons from "react-icons/gr";

const DocsCard = () => {
    return (
        <div className="docsCard">
            <h1>Imię</h1>
            <h2>Doktor</h2>
            <GrIcons.GrDocumentPdf  className="text-white"/>
        </div>
    );
}

export default DocsCard;