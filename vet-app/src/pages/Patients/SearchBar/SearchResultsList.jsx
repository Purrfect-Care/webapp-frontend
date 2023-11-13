import React from "react";
import "./SearchResultsList.css";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results }) => {
  return (
    <div className="resultsList">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;
