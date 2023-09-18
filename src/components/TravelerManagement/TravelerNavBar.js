// NavBar.js
import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router for navigation
import "../../res/css/NavBar.css"; // Import custom CSS for styling

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/traveler-management">
          Traveler Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/traveler/create">
                <i className="fas fa-user-plus"></i> Create Travelers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/traveler/view">
                <i className="fas fa-user-plus"></i> View Travelers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-traveler">
                <i className="fas fa-user-plus"></i> Account Activation
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
