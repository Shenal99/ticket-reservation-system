import React, { useState, useEffect } from "react";
import NavBar from "./TrainNavBar";
import CustomAppBar from "../AppBar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

export default function ViewTrainSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [startQuery, setStartQuery] = useState("");
  const [endQuery, setEndQuery] = useState("");

//   useEffect(() => {
//     // Fetch the list of train schedules from your API
//     axios.get("https://localhost:7173/api/TrainSchedules").then((response) => {
//       setSchedules(response.data);
//     });
//   }, []);

  const handleDeleteSchedule = (id) => {
    // Use SweetAlert for delete confirmation
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this schedule!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // User confirmed deletion, send DELETE request
        axios
          .delete(`https://localhost:7173/api/TrainSchedules/${id}`)
          .then(() => {
            // Remove the deleted schedule from the state
            setSchedules((prevSchedules) =>
              prevSchedules.filter((schedule) => schedule.id !== id)
            );

            swal("Schedule has been deleted!", {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting schedule:", error);
            swal("Error deleting schedule!", {
              icon: "error",
            });
          });
      } else {
        swal("Schedule was not deleted.");
      }
    });
  };

  // Filter the schedules based on the search queries
  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
      schedule.startDestination.toLowerCase().includes(startQuery.toLowerCase()) &&
      schedule.endDestination.toLowerCase().includes(endQuery.toLowerCase())
  );

  return (
    <>
      <CustomAppBar />
      <NavBar />
      <div className="view-train-schedules-container">
        <div className="container mt-5">
          <h2>View Train Schedules</h2>
          {/* Search fields next to each other */}
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control small-input"
                placeholder="Search by Name"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control small-input"
                placeholder="Search by Start Destination"
                value={startQuery}
                onChange={(e) => setStartQuery(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control small-input"
                placeholder="Search by End Destination"
                value={endQuery}
                onChange={(e) => setEndQuery(e.target.value)}
              />
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Start Destination</th>
                <th>End Destination</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.name}</td>
                  <td>{schedule.startDestination}</td>
                  <td>{schedule.endDestination}</td>
                  <td>{schedule.startTime}</td>
                  <td>{schedule.endTime}</td>
                  <td>{schedule.date}</td>
                  <td>
                    <span
                      className={`status ${
                        schedule.status ? "active" : "inactive"
                      }`}
                    >
                      {schedule.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="delete-icon"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                    />
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
