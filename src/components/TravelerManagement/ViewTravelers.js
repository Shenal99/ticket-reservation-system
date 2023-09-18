import React, { useState, useEffect } from "react";
import NavBar from "./TravelerNavBar";
import CustomAppBar from "../AppBar"; 
import axios from "axios";

export default function ViewTravelers() {
  const [travelers, setTravelers] = useState([]);

  // useEffect(() => {
  //   // Fetch the list of travelers from your API
  //   axios.get("your_api_endpoint").then((response) => {
  //     setTravelers(response.data);
  //   });
  // }, []);

  return (
    <>
    <CustomAppBar />
    <NavBar />
    <div className="view-travelers-container">
      <div className="container mt-5">
        <h2>View Travelers</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>NIC</th>
              <th>Contact Information</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {travelers.map((traveler) => (
              <tr key={traveler.id}>
                <td>{traveler.name}</td>
                <td>{traveler.nic}</td>
                <td>{traveler.contact}</td>
                <td>
                  <span
                    className={`status ${
                      traveler.isActive ? "active" : "inactive"
                    }`}
                  >
                    {traveler.isActive ? "Active" : "Inactive"}
                  </span>
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
