import React, { useState, useEffect } from "react";
import NavBar from "./TrainNavBar";
import CustomAppBar from "../AppBar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { Link } from "react-router-dom"; // Import Link
import { OverlayTrigger, Tooltip } from "react-bootstrap"; // Import your tooltip component

export default function ViewTrainSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [dateQuery, setDateQuery] = useState("");
  const [startQuery, setStartQuery] = useState("");
  const [endQuery, setEndQuery] = useState("");

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get("https://localhost:7173/api/Schedule")
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
      });
  }, []);

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
        // User confirmed deletion, send DELETE request to your API
        axios
          .delete(`https://localhost:7173/api/Schedule/${id}`)
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

  // Function to truncate station list
  const truncateStationList = (stationList) => {
    const maxStationListLength = 3; // Define your maximum visible stations
    if (stationList.length <= maxStationListLength) {
      return stationList.map((station) => station.name).join(", ");
    } else {
      const truncatedList = stationList
        .slice(0, maxStationListLength)
        .map((station) => station.name)
        .join(", ");
      return `${truncatedList}...`; // Add an ellipsis to indicate more stations
    }
  };

  // Filter the schedules based on the search queries and active status
  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.date.toLowerCase().includes(dateQuery.toLowerCase()) &&
      schedule.startDestination.toLowerCase().includes(startQuery.toLowerCase()) &&
      schedule.endDestination.toLowerCase().includes(endQuery.toLowerCase())
  );

  return (
    <>
      <div className="train-background">
        <CustomAppBar />
        <NavBar />
        <div className="view-train-schedules-container">
          <div
            className="container mt-5"
            style={{ backgroundColor: "white", padding: "15px" }}
          >
            <h2>View Train Schedules</h2>
            {/* Search fields next to each other */}
            <div className="row">
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control small-input"
                  placeholder="Search by Date"
                  value={dateQuery}
                  onChange={(e) => setDateQuery(e.target.value)}
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
                  <th>Train Name</th>
                  <th>Start Destination</th>
                  <th>End Destination</th>
                  <th>Station List</th>
                  <th>Seats</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.trainName}</td>
                    <td>{schedule.startDestination}</td>
                    <td>{schedule.endDestination}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-${schedule.id}`}>
                            <div style={{ maxWidth: "300px" }}>
                              <strong>Station List:</strong>
                              <br />
                              {schedule.stationList.map((station) => (
                                <div key={station.name}>{station.name}</div>
                              ))}
                            </div>
                          </Tooltip>
                        }
                      >
                        <span className="station-list-truncate">
                          {truncateStationList(schedule.stationList)}
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>{schedule.seats}</td>
                    <td>{schedule.date}</td>
                    <td>{schedule.startTime}</td>
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
                      <Link to={`/train-schedule/edit/${schedule.id}`}>
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                      </Link>
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
      </div>
    </>
  );
}
