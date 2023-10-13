import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import NavBar from "./TravelerNavBar";
import CustomAppBar from "../AppBar";
import "../../res/css/createTraveler.css";

export default function CreateTraveler() {
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add input validation
    if (!name || !nic || !email || !phone || !password) {
      Swal.fire("Missing Information", "Please fill out all fields.", "error");
      return;
    }

    // Validate email using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }

    // Validate NIC format (customize as needed)
    const nicRegex = /^[0-9]{9}[vVxX]$/;
    if (!nicRegex.test(nic)) {
      Swal.fire("Invalid NIC", "Please enter a valid NIC.", "error");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7173/api/Traveller/register", {
        name,
        nic,
        email,
        phone,
        pwrd: password,
        status: isActive ? 1 : 0,
      });

      if (response.status === 200 || response.status === 201) {
        // Use Swal to show a success message
        Swal.fire({
          title: "Success",
          text: "Traveler Successfully Created",
          icon: "success",
        }).then(() => {
          // Redirect to the desired page
          window.location.href = "/traveler/view";
        });
      } else {
        Swal.fire("Traveler Creation Failed!", "Please try again.", "error");
      }

      // Reset the form fields
      setName("");
      setNic("");
      setEmail("");
      setPhone("");
      setPassword("");
      setIsActive(false);
    } catch (error) {
      console.error("Error:", error);

      // Use Swal to show an error message
      Swal.fire("Traveler Creation Failed!", "Please try again later.", "error");
    }
  };

  return (
    <>
      <div className="train-background">
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
                  onChange={(e) => setNic(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact">Email</label>
                <input
                  type="email"  // Use type="email" for email input
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"  // Use type="tel" for phone input
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
      </div>
    </>
  );
}
