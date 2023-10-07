import React, { useState, useEffect } from "react";
import NavBar from "./TravelerNavBar";
import CustomAppBar from "../AppBar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function AccountActivation() {
  const [travelers, setTravelers] = useState([]);
  const [nicQuery, setNicQuery] = useState("");

  useEffect(() => {
    // Fetch the list of travelers from your API
    axios.get("https://localhost:7173/api/Traveller").then((response) => {
      setTravelers(response.data);
    });
  }, []);

  // Function to activate a traveler
  const activateTraveler = (id) => {
    axios.post(`https://localhost:7173/api/Traveller/reactivate?id=${id}`)
      .then((response) => {
        // Update the status of the traveler in the state after successful activation
        setTravelers((prevTravelers) => {
          return prevTravelers.map((traveler) =>
            traveler.id === id ? { ...traveler, status: true } : traveler
          );
        });
        // Show a success message or perform any other action
        swal("Success", "Traveler activated successfully!", "success");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error activating traveler:", error);
      });
  };

  // Function to deactivate a traveler
  const deactivateTraveler = (id) => {
    axios.post(`https://localhost:7173/api/Traveller/deactivate?id=${id}`)
      .then((response) => {
        // Update the status of the traveler in the state after successful deactivation
        setTravelers((prevTravelers) => {
          return prevTravelers.map((traveler) =>
            traveler.id === id ? { ...traveler, status: false } : traveler
          );
        });
        // Show a success message or perform any other action
        swal("Success", "Traveler deactivated successfully!", "success");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error deactivating traveler:", error);
      });
  };

  // Filter the travelers based on the search queries
  const filteredTravelers = travelers.filter(
    (traveler) =>
      traveler.nic.toLowerCase().includes(nicQuery.toLowerCase())
  );

  return (
    <>
      <div className="train-background">
        <CustomAppBar />
        <NavBar />
        <div className="container mt-5" style={{ backgroundColor: 'white', padding: '20px' }}>
          <h2>Account Activation</h2>
          {/* Search fields next to each other */}
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control small-input"
                placeholder="Search by NIC"
                value={nicQuery}
                onChange={(e) => setNicQuery(e.target.value)}
              />
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>NIC</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTravelers.map((traveler) => (
                <tr key={traveler.id}>
                  <td>{traveler.nic}</td>
                  <td>
                    <span
                      className={`status ${traveler.status ? "active" : "inactive"
                        }`}
                    >
                      {traveler.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    {traveler.status ? (
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-danger btn-sm"
                        onClick={() => deactivateTraveler(traveler.id)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-success btn-sm"
                        onClick={() => activateTraveler(traveler.id)}
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
