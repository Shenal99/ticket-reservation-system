import React, { useState, useEffect } from "react";
import NavBar from "./BookingNavBar";
import CustomAppBar from "../AppBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BookingConfirmationModal from "./BookingConfirmationModal";
import "../../res/css/viewSchedules.css";

export default function ViewSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [dateQuery, setDateQuery] = useState("");
  const [startQuery, setStartQuery] = useState("");
  const [endQuery, setEndQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7173/api/Schedule")
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
      });
  }, []);

  const truncateStationList = (stationList) => {
    const maxStationListLength = 3;
    if (stationList.length <= maxStationListLength) {
      return stationList.map((station) => station.name).join(", ");
    } else {
      const truncatedList = stationList
        .slice(0, maxStationListLength)
        .map((station) => station.name)
        .join(", ");
      return `${truncatedList}...`;
    }
  };

  const activeStatus = 1;

  // Filter the schedules based on the date, start, and end queries and the active status
  const filteredSchedules = schedules.filter((schedule) => {
    return (
      schedule.date.toLowerCase().includes(dateQuery.toLowerCase()) &&
      (schedule.stationList.find(station => station.name.toLowerCase().includes(startQuery.toLowerCase())) ||
        schedule.startDestination.toLowerCase().includes(startQuery.toLowerCase())) &&
      (schedule.stationList.find(station => station.name.toLowerCase().includes(endQuery.toLowerCase())) ||
        schedule.endDestination.toLowerCase().includes(endQuery.toLowerCase())) &&
      schedule.status === activeStatus
    );
  });

  const handleReset = () => {
    setDateQuery("");
    setStartQuery("");
    setEndQuery("");
  };

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleShowBookingModal = (schedule) => {
    setSelectedSchedule(schedule);
    setShowBookingModal(true);
  };

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
            <div className="row">
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control small-input"
                  placeholder="Search by Date"
                  value={dateQuery}
                  onChange={(e) => setDateQuery(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control small-input"
                  placeholder="Search by Start Destination"
                  value={startQuery}
                  onChange={(e) => setStartQuery(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control small-input"
                  placeholder="Search by End Destination"
                  value={endQuery}
                  onChange={(e) => setEndQuery(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>

            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Train Name</th>
                  <th>Destination</th>
                  <th>Station List</th>
                  <th>Seats</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.trainName}</td>
                    <td>{schedule.startDestination} to {schedule.endDestination}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-${schedule.id}`}>
                            <div style={{ maxWidth: "300px" }}>
                              <strong>Station List:</strong>
                              <br />
                              {schedule.stationList ? (
                                schedule.stationList.map((station) => (
                                  <div key={station.name}>{station.name}</div>
                                ))
                              ) : (
                                <div>No stations available</div>
                              )}
                            </div>
                          </Tooltip>
                        }
                      >
                        <span className="station-list-truncate">
                          {schedule.stationList
                            ? truncateStationList(schedule.stationList)
                            : "No stations"}
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>{schedule.seats}</td>
                    <td>{schedule.date}</td>
                    <td>{schedule.startTime}</td>
                    <td>
                      <button
                        className="custom-book-button"
                        onClick={() => handleShowBookingModal(schedule)}
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Render the booking confirmation modal */}
      {selectedSchedule && (
        <BookingConfirmationModal
          show={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          scheduleId={selectedSchedule.id}
          trainName={selectedSchedule.trainName}
          startTime={selectedSchedule.startTime}
          stationList={selectedSchedule.stationList}
          date={selectedSchedule.date}
          startDestination={selectedSchedule.startDestination}
          endDestination={selectedSchedule.endDestination}
        />
      )}
    </>
  );
}
