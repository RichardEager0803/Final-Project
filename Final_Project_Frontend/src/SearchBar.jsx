import { useState } from 'react'
import './styles/SearchBar.css'

function SearchBar(props) {
    const [searchText, setSearchText] = useState('');

    return (
        <div className="search-container">
            <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search products..."
                className="search-input"
            />

            <button onClick={() => {
                props.onHandleSearch(searchText)
                setSearchText('')
            }} 
                className="search-button"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;