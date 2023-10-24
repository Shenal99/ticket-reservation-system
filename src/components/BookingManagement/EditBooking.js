import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import "../../res/css/createSchedule.css";
import NavBar from "./BookingNavBar";
import CustomAppBar from "../AppBar";
import Select from "react-select"; // Import react-select

export default function EditBooking() {
  const { id } = useParams();
  const [reservation, setReservation] = useState({
    travellerId: "",
    scheduleId: "",
    reservationStart: "",
    reservationEnd: "",
    pax: 0,
  });
  const [travellers, setTravellers] = useState([]); // List of travellers for auto-complete
  const [scheduleOptions, setScheduleOptions] = useState([]); // List of schedule options

  useEffect(() => {
    // Fetch the list of travellers for auto-complete
    axios
      .get("https://localhost:7173/api/Traveller")
      .then((response) => {
        const travellerOptions = response.data.map((traveller) => ({
          value: traveller.id,
          label: traveller.nic,
        }));
        setTravellers(travellerOptions);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch the list of schedule options for scheduleId
    axios
      .get("https://localhost:7173/api/Schedule")
      .then((response) => {
        const scheduleOptions = response.data.map((schedule) => ({
          value: schedule.id,
          label: schedule.trainName,
        }));
        setScheduleOptions(scheduleOptions);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch reservation data by ID
    axios
      .get(`https://localhost:7173/api/Reservation/get?id=${id}`)
      .then((response) => {
        setReservation(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  function updateReservation(e) {
    e.preventDefault();

    if (isNaN(reservation.pax)) {
      Swal.fire("Invalid Input", "Number of seats must be a valid number.", "error");
      return;
    }

    const seats = parseInt(reservation.pax);

    if (seats < 1 || seats > 4) {
      Swal.fire("Invalid Input", "Number of seats must be between 1 and 4.", "error");
      return;
    }
    axios
      .post(`https://localhost:7173/api/Reservation/edit?id=${id}`, reservation)
      .then((response) => {
        if (response.status === 200) {
          swal({
            title: "Success",
            text: "Reservation Successfully Updated",
            icon: "success",
            type: "success",
          }).then(function () {
            // Redirect to the reservation list or any other desired page
            window.location.href = "/booking/management";
          });
        } else {
          swal("Reservation Update Failed!");
        }
      })
      .catch((error) => {
        console.error(error);
        swal("Cannot Upadate Reservation", "The schedule date is within 5 days from today.", {icon: "warning"});
      });
  }

  return (
    <>
      <div className="train-background">
        <CustomAppBar />
        <NavBar />
        <div className="container mt-5 create-train-schedule-container">
          <div className="create-train-schedule">
            <h2>Edit Reservation</h2>
            <form onSubmit={updateReservation}>
              <div className="form-group">
                <label htmlFor="travellerId">Traveller</label>
                <Select
                  options={travellers}
                  value={travellers.find((option) => option.value === reservation.travellerId)}
                  onChange={(selectedOption) => setReservation({ ...reservation, travellerId: selectedOption.value })}
                  isSearchable={true}
                  placeholder="Select Traveller"
                />
              </div>
              <div className="form-group">
                <label htmlFor="scheduleId">Schedule</label>
                <Select
                  options={scheduleOptions}
                  value={scheduleOptions.find((option) => option.value === reservation.scheduleId)}
                  onChange={(selectedOption) => setReservation({ ...reservation, scheduleId: selectedOption.value })}
                  isSearchable={true}
                  placeholder="Select Schedule"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reservationStart">Reservation Start</label>
                <input
                  type="text"
                  name="reservationStart"
                  className="form-control"
                  value={reservation.reservationStart}
                  onChange={(e) => setReservation({ ...reservation, reservationStart: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reservationEnd">Reservation End</label>
                <input
                  type="text"
                  name="reservationEnd"
                  className="form-control"
                  value={reservation.reservationEnd}
                  onChange={(e) => setReservation({ ...reservation, reservationEnd: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pax">Number of Seats</label>
                <input
                  type="number"
                  name="pax"
                  className="form-control"
                  value={reservation.pax}
                  onChange={(e) => setReservation({ ...reservation, pax: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Update Reservation</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
