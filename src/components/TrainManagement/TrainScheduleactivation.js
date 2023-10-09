import React, { useState, useEffect } from "react";
import NavBar from "./TrainNavBar";
import CustomAppBar from "../AppBar";
import axios from "axios";
import swal from "sweetalert";

export default function TrainScheduleActivation() {
  const [schedules, setSchedules] = useState([]);
  const [scheduleQuery, setScheduleQuery] = useState("");

//   useEffect(() => {
//     // Fetch the list of train schedules from your API
//     axios.get("https://localhost:7173/api/TrainSchedules").then((response) => {
//       setSchedules(response.data);
//     });
//   }, []);

  // Function to activate a train schedule
  const activateSchedule = (id) => {
    axios.post(`https://localhost:7173/api/TrainSchedules/activate?id=${id}`)
      .then((response) => {
        // Update the status of the train schedule in the state after successful activation
        setSchedules((prevSchedules) => {
          return prevSchedules.map((schedule) =>
            schedule.id === id ? { ...schedule, status: true } : schedule
          );
        });
        // Show a success message or perform any other action
        swal("Success", "Train schedule activated successfully!", "success");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error activating train schedule:", error);
      });
  };

  // Function to deactivate a train schedule
  const deactivateSchedule = (id) => {
    axios.post(`https://localhost:7173/api/TrainSchedules/deactivate?id=${id}`)
      .then((response) => {
        // Update the status of the train schedule in the state after successful deactivation
        setSchedules((prevSchedules) => {
          return prevSchedules.map((schedule) =>
            schedule.id === id ? { ...schedule, status: false } : schedule
          );
        });
        // Show a success message or perform any other action
        swal("Success", "Train schedule deactivated successfully!", "success");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error deactivating train schedule:", error);
      });
  };

  // Filter the train schedules based on the search queries
  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.name.toLowerCase().includes(scheduleQuery.toLowerCase())
  );

  return (
    <>
      <div className="train-background">
        <CustomAppBar />
        <NavBar />
        <div className="container mt-5" style={{ backgroundColor: 'white', padding: '20px' }}>
          <h2>Train Schedule Activation</h2>
          {/* Search fields next to each other */}
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control small-input"
                placeholder="Search by Train Name"
                value={scheduleQuery}
                onChange={(e) => setScheduleQuery(e.target.value)}
              />
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Train Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.name}</td>
                  <td>
                    <span
                      className={`status ${schedule.status ? "active" : "inactive"
                        }`}
                    >
                      {schedule.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    {schedule.status ? (
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-danger btn-sm"
                        onClick={() => deactivateSchedule(schedule.id)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-success btn-sm"
                        onClick={() => activateSchedule(schedule.id)}
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
