import React from "react";
import { Link } from "react-router-dom";
import "../../res/css/NavBar.css";

export default function NavBar() {
  const userRole = localStorage.getItem("userRole"); // Retrieve user role from localStorage

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
            {userRole === "1" && (
              <li className="nav-item">
                <Link className="nav-link" to="/traveler/activation">
                  <i className="fas fa-user-plus"></i> Account Activation
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
