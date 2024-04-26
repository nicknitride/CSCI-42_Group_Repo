import React, { useState } from 'react';
import "../css/Navbar.css";
import gymlogo from "../assets/1_gym.svg";
import { Link } from "react-router-dom";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="outer-nav-flex">
        <div className="left-nav-flex">
          <div className="rounded-button">
            <Link to="/">Home</Link>
          </div>
          <div className="rounded-button">
            <Link to="/workouts">Workouts</Link>
          </div>
          <div className="rounded-button">
            <Link to="/meals">Meal Tracking</Link>
          </div>
          <div className="rounded-button">
            <Link to="/fileops">Import/Export</Link>
          </div>
        </div>
        <div className="nav-logo">
          <img src={gymlogo} alt="Gym Logo" />
          <span>Intellifit {String.fromCharCode(8482)}</span>
        </div>
        
        {/* Mobile dropdown */}
        <div className="dropdown-mobile" onClick={toggleDropdown}>
          <img src={gymlogo} alt="Gym Logo" />
          {showDropdown && (
            <div className="content">
              <Link to="/">Home</Link>
              <Link to= "/workouts">Workouts</Link>
              <Link to="/meals">Meal Tracking</Link>
              <Link to="/fileops">Import/Export</Link>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default Navbar;
