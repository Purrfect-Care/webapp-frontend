import React from "react";
import DocsCard from "./DocsCard";
import "./DocumentsPage.css";

const DocumentsPage = () => {
    return (
        <div className="documentsPage">
            <div className="cards">
                <DocsCard />
                <DocsCard />
                <DocsCard />
                <DocsCard />
                <DocsCard />
                <DocsCard />
                <DocsCard />
                <DocsCard />
                <DocsCard />
                <DocsCard />
            </div>
        </div>
    );
}

export default DocumentsPage;