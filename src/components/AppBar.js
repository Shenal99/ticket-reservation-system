// AppBar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../res/css/appbar.css"; // Customize your app bar CSS

export default function CustomAppBar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("Agent"); // Replace with actual username

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    alert("Logged out");
    // You may want to redirect the user to the login page after logging out.
  };

  return (
    <div className="app-bar">
      <div className="app-bar-content">
        {/* Home Button */}
        <Link to="/home" className="home-button">
          <img
            src={require("../res/images/home.png")} // Replace with the path to your home button icon image
            alt="Home"
            className="home-icon"
          />
        </Link>
        <h2>Ticket Reservation System</h2>
        <div className="profile-icon" onClick={toggleDropdown}>
          <img
            src={require("../res/images/prof.png")}
            alt="Profile"
            className="profile-image"
          />
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <p>Welcome, {username}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
