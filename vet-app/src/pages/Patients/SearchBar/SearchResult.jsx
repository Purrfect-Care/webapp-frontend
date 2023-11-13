import React from 'react';
import "./SearchResult.css";

const SearchResult = ({ result }) => {
  return (
    <div className='searchResult'>{result.name}</div>
  );
}

export default SearchResult;
