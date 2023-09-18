import React, { useState } from "react";
import NavBar from "./TravelerNavBar";
import CustomAppBar from "../AppBar"; 
import "../../res/css/createTraveler.css";

export default function CreateTraveler() {
  // Define state variables to store form data
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [contact, setContact] = useState("");
  const [isActive, setIsActive] = useState(true); // Default to active

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the API call to create the traveler profile here
    // You can use Axios or fetch to send a POST request to your backend
    // with the form data.
    // After a successful submission, you can show a success message or redirect the user.
    console.log("Form submitted:", name, nic, contact, isActive);
  };

  return (
    <>
    <CustomAppBar />
    <NavBar />
    <div className="create-traveler-container">
      <div className="create-traveler-form">
        <h2>Create Traveler Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nic">NIC (National Identification Card)</label>
            <input
              type="text"
              className="form-control"
              id="nic"
              value={nic}
              onChange={(e) => setNIC(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Information</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="isActive">Traveler Status</label>
            <select
              className="form-control"
              id="isActive"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
