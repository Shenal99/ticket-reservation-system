import React, { useState, useEffect } from "react";
import NavBar from "./BookingNavBar";
import CustomAppBar from "../AppBar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import "../../res/css/viewSchedules.css";

export default function ViewSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [dateQuery, setDateQuery] = useState("");
  const [startQuery, setStartQuery] = useState("");
  const [endQuery, setEndQuery] = useState("");

//   useEffect(() => {
//     // Fetch the list of train schedules from your API
//     axios.get("https://localhost:7173/api/TrainSchedules").then((response) => {
//       setSchedules(response.data);
//     });
//   }, []);
useEffect(() => {
    // Sample data for train schedules
    const sampleData = [
      {
        id: 1,
        name: "Express Train 1",
        startDestination: "City A",
        endDestination: "City B",
        startTime: "08:00 AM",
        endTime: "10:00 AM",
        date: "2023-10-15",
        pricePerTicket: "$20",
        seats: 100,
        status: "Active",
      },
      {
        id: 2,
        name: "Local Train 2",
        startDestination: "City C",
        endDestination: "City D",
        startTime: "09:30 AM",
        endTime: "11:30 AM",
        date: "2023-10-16",
        pricePerTicket: "$15",
        seats: 80,
        status: "Active",
      },
      {
        id: 3,
        name: "Express Train 3",
        startDestination: "City A",
        endDestination: "City D",
        startTime: "11:00 AM",
        endTime: "01:00 PM",
        date: "2023-10-17",
        pricePerTicket: "$25",
        seats: 120,
        status: "Inactive",
      },
    ];

    // Set the sample data as schedules
    setSchedules(sampleData);
  }, []);

  const handleBookNow = (scheduleId) => {
    // Handle booking logic here
    // You can redirect to a booking page with the selected schedule
    // or display a confirmation message, etc.
    swal("Booking Confirmation", "Your booking has been confirmed!", "success");
  };

  // Filter the schedules based on the search queries and active status
  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.date.toLowerCase().includes(dateQuery.toLowerCase()) &&
      schedule.startDestination.toLowerCase().includes(startQuery.toLowerCase()) &&
      schedule.endDestination.toLowerCase().includes(endQuery.toLowerCase()) &&
      schedule.status === "Active"
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
                  <th>Name</th>
                  <th>Destination</th> {/* Combined column */}
                  <th>Time</th>
                  <th>Date</th>
                  <th>Ticket Price</th>
                  <th>Seats</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.name}</td>
                    <td>
                      {`${schedule.startDestination} to ${schedule.endDestination}`}
                    </td>
                    <td>{schedule.startTime} - {schedule.endTime}</td>
                    <td>{schedule.date}</td>
                    <td>{schedule.pricePerTicket}</td>
                    <td>{schedule.seats}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm custom-book-button"
                        onClick={() => handleBookNow(schedule.id)}
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
    </>
  );
}
