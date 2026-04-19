import React from "react";
import "./styles/NavBar.css";
import SearchBar from './SearchBar.jsx';

function NavBar(props) {
  return (
    <nav className="navbar">
        <div className="navbar-left">
            <div className="navbar-logo">
                Rich's Shop
            </div>
        </div>

        <div className="navbar-center">
            <SearchBar onHandleSearch={props.onHandleSearch} />
        </div>

        <div className="navbar-right">
            <button onClick={props.onHandleHomeMenuClick}>
                Home
            </button>
            <button onClick={props.onSetToggleCart}>
                {props.toggleCart ? "Hide Cart" : "Show Cart"}
            </button>
        </div>
    </nav>
  );
};

export default NavBar;