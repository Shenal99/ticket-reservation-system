import React, { useState, useEffect } from "react";
import NavBar from "./TravelerNavBar";
import CustomAppBar from "../AppBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import "../../res/css/viewTravelers.css";

export default function ViewTravelers() {
  const [travelers, setTravelers] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [nicQuery, setNicQuery] = useState("");

  useEffect(() => {
    // Fetch the list of travelers from your API
    axios.get("https://localhost:7173/api/Traveller").then((response) => {
      setTravelers(response.data);
    });
  }, []);

  const handleDeleteTraveler = (id) => {
    // Use SweetAlert for delete confirmation
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this traveler!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // User confirmed deletion, send DELETE request
        axios
          .delete(`https://localhost:7173/api/Traveller/${id}`)
          .then(() => {
            // Remove the deleted traveler from the state
            setTravelers((prevTravelers) =>
              prevTravelers.filter((traveler) => traveler.id !== id)
            );

            swal("Traveler has been deleted!", {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting traveler:", error);
            swal("Error deleting traveler!", {
              icon: "error",
            });
          });
      } else {
        swal("Traveler was not deleted.");
      }
    });
  };

  // Filter the travelers based on the search queries
  const filteredTravelers = travelers.filter(
    (traveler) =>
      traveler.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
      traveler.nic.toLowerCase().includes(nicQuery.toLowerCase())
  );

  return (
    <>
      <div className="view-travelers-container train-background">
        <CustomAppBar />
        <NavBar />
        <div className="container mt-5" style={{ backgroundColor: 'white', padding: '15px' }}>
          <h2>View Travelers</h2>
          {/* Search fields next to each other */}
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control small-input"
                placeholder="Search by name"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
              />
            </div>
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
                <th>Name</th>
                <th>NIC</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTravelers.map((traveler) => (
                <tr key={traveler.id}>
                  <td>{traveler.name}</td>
                  <td>{traveler.nic}</td>
                  <td>{traveler.email}</td>
                  <td>{traveler.phone}</td>
                  <td>
                    <span
                      className={`status ${traveler.status ? "active" : "inactive"
                        }`}
                    >
                      {traveler.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Link to={`/traveler/edit/${traveler.id}`}>
                      <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    </Link>
                    <Link to="#" onClick={() => handleDeleteTraveler(traveler.id)}>
                      <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                    </Link>
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
