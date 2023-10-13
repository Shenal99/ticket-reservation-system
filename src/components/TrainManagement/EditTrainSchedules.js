import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./TrainNavBar";
import CustomAppBar from "../AppBar";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import "../../res/css/createSchedule.css";

export default function EditTrainSchedule() {
  const { id } = useParams();
  const [trainName, setTrainName] = useState("");
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [stationList, setStationList] = useState([]);
  const [seats, setSeats] = useState(0);
  const [scheduleDate, setScheduleDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Fetch the existing schedule data by making an API request
    axios
      .get(`https://localhost:7173/api/Schedule/get?id=${id}`)
      .then((response) => {
        const existingSchedule = response.data;

        // Update the state with the existing schedule data
        setTrainName(existingSchedule.trainName);
        setStartDestination(existingSchedule.startDestination);
        setEndDestination(existingSchedule.endDestination);
        setStationList(existingSchedule.stationList);
        setSeats(existingSchedule.seats);
        setScheduleDate(existingSchedule.date);
        setStartTime(existingSchedule.startTime);
        setIsActive(existingSchedule.status === 1);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add input validation
    if (
      !trainName ||
      !startDestination ||
      !endDestination ||
      stationList.length === 0 ||
      seats <= 0 ||
      !scheduleDate ||
      !startTime
    ) {
      Swal.fire("Missing Information", "Please fill out all fields.", "error");
      return;
    }

    // Validate station names
    for (const station of stationList) {
      if (!station.name) {
        Swal.fire("Invalid Station Name", "Please enter valid station names.", "error");
        return;
      }
    }

    // Validate the seats value
    if (isNaN(seats) || seats <= 0) {
      Swal.fire("Invalid Number of Seats", "Please enter a valid number of seats.", "error");
      return;
    }

    // Validate scheduleDate and startTime formats (customize as needed)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!dateRegex.test(scheduleDate) || !timeRegex.test(startTime)) {
      Swal.fire("Invalid Date or Time Format", "Please enter valid date and time formats.", "error");
      return;
    }

    // Prepare the data to send to the server
    const updatedSchedule = {
      trainName,
      startDestination,
      endDestination,
      stationList,
      seats,
      date: scheduleDate,
      startTime,
      status: isActive ? 1 : 0,
    };

    // API endpoint for updating train schedules
    const apiUrl = `https://localhost:7173/api/Schedule/edit?id=${id}`;

    try {
      // Send a PUT request to update the schedule
      const response = await axios.post(apiUrl, updatedSchedule);

      if (response.status === 200) {
        // Use Swal to show a success message
        Swal.fire({
          title: "Success",
          text: "Train Schedule Successfully Updated",
          icon: "success",
        }).then(() => {
          // Redirect to the desired page
          window.location.href = "/schedule/view";
        });
      } else {
        Swal.fire("Train Schedule Update Failed!", "Please try again.", "error");
      }
    } catch (error) {
      console.error("Error:", error);

      // Use Swal to show an error message
      Swal.fire("Train Schedule Update Failed!", "Please try again later.", "error");
    }
  };

  return (
    <>
      <div className="train-background">
        <CustomAppBar />
        <NavBar />
        <div className="container mt-5 create-train-schedule-container">
          <div className="create-train-schedule">
            <h2>Edit Train Schedule</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="trainName">Train Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="trainName"
                  value={trainName}
                  onChange={(e) => setTrainName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="startDestination">Start Destination</label>
                <input
                  type="text"
                  className="form-control"
                  id="startDestination"
                  value={startDestination}
                  onChange={(e) => setStartDestination(e.target.value)}
                  required
                />
              </div>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="endDestination">End Destination</label>
                <input
                  type="text"
                  className="form-control"
                  id="endDestination"
                  value={endDestination}
                  onChange={(e) => setEndDestination(e.target.value)}
                  required
                />
              </div>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="stationList">Station List</label>
                <input
                  type="text"
                  className="form-control"
                  id="stationList"
                  value={stationList.map((station) => station.name).join(", ")} // Display stationList as a comma-separated string
                  onChange={(e) => {
                    const stationNames = e.target.value.split(", ").map((stationName) => stationName.trim());
                    const stationObjects = stationNames.map((name) => ({ name }));
                    setStationList(stationObjects);
                  }}
                  required
                />
              </div>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="seats">Seats</label>
                <input
                  type="number"
                  className="form-control"
                  id="seats"
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="scheduleDate">Schedule Date</label>
                <input
                  type="date" // Use type="date" for date input
                  className="form-control"
                  id="scheduleDate"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="text" // Use type="text" for time input
                  className="form-control"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="isActive">
                  Schedule is Active
                </label>
              </div>
              <button
                type="submit"
                className="btn create-train-schedule-btn-primary btn-block"
              >
                Update Schedule
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

