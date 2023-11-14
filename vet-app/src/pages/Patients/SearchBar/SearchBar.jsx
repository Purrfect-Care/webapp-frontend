import "./SearchBar.css";
import * as FaIcons from "react-icons/fa";

const SearchBar = ({ setResults, showSearchResults, setInput, input }) => {
  let debounceTimer;

  const fetchData = (value) => {
    fetch(`http://localhost:8000/api/patient-search/?query=${value}`)
      .then((response) => response.json())
      .then((json) => {  
        setResults(json);
      });
  };

  const handleDebouncedSearch = (value) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchData(value);
    }, 300); 
  };

  const handleChange = (value) => {
    setInput(value);
    handleDebouncedSearch(value);
  };

  return (
    <div className="inputWrapper" >
      <input
        className="inputSearch"
        placeholder="Wyszukaj..."
        value={input}
        onClick={showSearchResults}
        onChange={(e) => handleChange(e.target.value)}
      />
      <FaIcons.FaSearch className="searchIcon" />
    </div>
  );
};

export default SearchBar;
