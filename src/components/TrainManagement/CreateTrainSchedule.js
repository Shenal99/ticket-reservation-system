import React, { useState } from "react";
import axios from "axios";
import NavBar from "./TrainNavBar";
import CustomAppBar from "../AppBar";
import "../../res/css/createSchedule.css";

export default function CreateTrainSchedule() {
  const [TrainName, setTrainName] = useState("");
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to send to the server
    const newSchedule = {
      name: TrainName,
      startDestination,
      endDestination,
      startTime,
      endTime,
      date: scheduleDate,
      status: isActive ? 1 : 0,
    };

    // TODO: Add form validation and API call to create train details
    axios.post("your_api_endpoint", newSchedule).then((response) => {
      // Handle the response or errors here
    });
  };

  return (
    <>
      <div className="train-background">
        <CustomAppBar />
        <NavBar />
        <div className="container mt-5 create-train-schedule-container">
          <div className="create-train-schedule">
            <h2>Create Train Schedule</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="TrainName">Train Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="TrainName"
                  value={TrainName}
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
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-group create-train-schedule-form-group">
                <label htmlFor="scheduleDate">Schedule Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="scheduleDate"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
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
                Create Schedule
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
