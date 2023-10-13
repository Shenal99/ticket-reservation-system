import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert"; // Import SweetAlert
import "../res/css/appbar.css"; // Customize your app bar CSS

export default function CustomAppBar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("Agent"); // Replace with actual username

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Use SweetAlert for logout confirmation
    swal({
      title: "Logout",
      text: "Are you sure you want to log out?",
      icon: "warning",
      buttons: ["Cancel", "Logout"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        // User confirmed logout, implement your logout logic here
        // For example, you can clear user session or token
        // Redirect the user to the login page
        window.location.href = "/login"; // Replace with your login page route
      }
    });
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
