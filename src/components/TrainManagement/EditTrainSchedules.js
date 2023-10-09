import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import "../../res/css/editTrainSchedule.css"; // Import the CSS file
import NavBar from "./TrainNavBar";
import CustomAppBar from "../AppBar";

export default function EditTrainSchedule() {
    const { id } = useParams();
    const [schedule, setSchedule] = useState({
        name: "",
        startDestination: "",
        endDestination: "",
        startTime: "",
        endTime: "",
        date: "",
        pricePerTicket: 0,
        seats: 0,
        status: 0,
    });

    //   useEffect(() => {
    //     axios
    //       .get(`https://localhost:7173/api/TrainSchedules/${id}`)
    //       .then((response) => {
    //         setSchedule(response.data);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }, [id]);

    function updateSchedule(e) {
        e.preventDefault();

        axios
            .put(`https://localhost:7173/api/TrainSchedules/${id}`, schedule)
            .then((response) => {
                if (response.status === 200) {
                    swal({
                        title: "Success",
                        text: "Train Schedule Successfully Updated",
                        icon: "success",
                        type: "success",
                    }).then(function () {
                        // Redirect to the train schedule list or any other desired page
                        window.location.href = "/train-schedule/view";
                    });
                } else {
                    swal("Train Schedule Update Failed!");
                }
            })
            .catch((error) => {
                console.error(error);
                swal("Train Schedule Update Failed!");
            });
    }

    return (
        <>
            <div className="train-background">
                <CustomAppBar />
                <NavBar />
                <div className="container mt-5 edit-train-schedule-container">
                    <div className="edit-train-schedule-form">
                        <h2>Edit Train Schedule</h2>
                        <form onSubmit={updateSchedule}>
                            <div className="form-group create-train-schedule-form-group">
                                <label htmlFor="name">Train Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={schedule.name}
                                    onChange={(e) =>
                                        setSchedule({ ...schedule, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group create-train-schedule-form-group">
                                <label htmlFor="startDestination">Start Destination</label>
                                <input
                                    type="text"
                                    name="startDestination"
                                    className="form-control"
                                    value={schedule.startDestination}
                                    onChange={(e) =>
                                        setSchedule({ ...schedule, startDestination: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group create-train-schedule-form-group">
                                <label htmlFor="endDestination">End Destination</label>
                                <input
                                    type="text"
                                    name="endDestination"
                                    className="form-control"
                                    value={schedule.endDestination}
                                    onChange={(e) =>
                                        setSchedule({ ...schedule, endDestination: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group create-train-schedule-form-group">
                                <label htmlFor="startTime">Start Time</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    className="form-control"
                                    value={schedule.startTime}
                                    onChange={(e) =>
                                        setSchedule({ ...schedule, startTime: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group create-train-schedule-form-group">
                                <label htmlFor="endTime">End Time</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    className="form-control"
                                    value={schedule.endTime}
                                    onChange={(e) =>
                                        setSchedule({ ...schedule, endTime: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group create-train-schedule-form-group">
                                <label htmlFor="date">Schedule Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    value={schedule.date}
                                    onChange={(e) =>
                                        setSchedule({ ...schedule, date: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group create-train-schedule-form-group">
                                <label htmlFor="pricePerTicket">Price per Ticket</label>
                                <input
                                    type="number"
                                    name="pricePerTicket"
                                    className="form-control"
                                    value={schedule.pricePerTicket}
                                    onChange={(e) =>
                                        setSchedule({ ...schedule, pricePerTicket: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group create-train-schedule-form-group">
                                <label htmlFor="seats">Seats</label>
                                <input
                                    type="number"
                                    name="seats"
                                    className="form-control"
                                    value={schedule.seats}
                                    onChange={(e) =>
                                        setSchedule({ ...schedule, seats: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="status"
                                    checked={schedule.status}
                                    onChange={(e) =>
                                        setSchedule({ ...schedule, status: e.target.checked ? 1 : 0 })
                                    }
                                />
                                <label className="form-check-label" htmlFor="status">
                                    Schedule is Active
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update Schedule
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
