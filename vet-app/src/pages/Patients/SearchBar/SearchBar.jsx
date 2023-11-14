import "./SearchBar.css";
import * as FaIcons from "react-icons/fa";

const SearchBar = ({ setInput, input, showSearchResults }) => {

  const handleChange = (value) => {
    setInput(value);
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
