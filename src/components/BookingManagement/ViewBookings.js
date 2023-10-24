import React, { useState, useEffect } from "react";
import NavBar from "./BookingNavBar";
import CustomAppBar from "../AppBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import "../../res/css/viewBookings.css";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [travelerNics, setTravelerNics] = useState({});
  const [trainDetails, setTrainDetails] = useState({});
  const [dateDetails, setDateDetails] = useState({});

  useEffect(() => {
    // Fetch the list of bookings from your API
    axios.get("https://localhost:7173/api/Reservation").then((response) => {
      setBookings(response.data);

      // Fetch and store traveler NICs and train details based on traveler IDs and schedule IDs
      const travelerIds = response.data.map((booking) => booking.travellerId);
      const scheduleIds = response.data.map((booking) => booking.scheduleId);
      fetchTravelerNics(travelerIds);
      fetchTrainDetails(scheduleIds);
    });
  }, []);

  const fetchTravelerNics = (travelerIds) => {
    travelerIds.forEach((travelerId) => {
      axios
        .get(`https://localhost:7173/api/Traveller/get?id=${travelerId}`)
        .then((response) => {
          // Store the traveler NIC in the state
          setTravelerNics((prevNics) => ({
            ...prevNics,
            [travelerId]: response.data.nic,
          }));
        })
        .catch((error) => {
          console.error("Error fetching traveler NIC:", error);
        });
    });
  };

  const fetchTrainDetails = (scheduleIds) => {
    scheduleIds.forEach((scheduleId) => {
      axios
        .get(`https://localhost:7173/api/Schedule/get?id=${scheduleId}`)
        .then((response) => {
          // Store the train details (including date) in the state
          const trainDetails = {
            trainName: response.data.trainName,
            date: response.data.date, // Modify this line to match the actual date field in your API response
          };
          setTrainDetails((prevDetails) => ({
            ...prevDetails,
            [scheduleId]: trainDetails,
          }));
        })
        .catch((error) => {
          console.error("Error fetching train details:", error);
        });
    });
  };

  const handleCancelReservation = (id, scheduleId) => {
    // Fetch the schedule details based on the scheduleId
    axios.get(`https://localhost:7173/api/Schedule/get?id=${scheduleId}`)
      .then((response) => {
        const scheduleDate = new Date(response.data.date); // Assuming the date is a valid ISO date string

        const currentDate = new Date();
        const dateDifference = Math.floor((scheduleDate - currentDate) / (1000 * 60 * 60 * 24)); // Calculate the date difference in days

        if (dateDifference <= 5) {
          swal("Cannot Cancel Reservation", "The schedule date is within 5 days from today.", {
            icon: "warning",
          });
        } else {
          // Use SweetAlert for cancellation confirmation
          swal({
            title: "Are you sure?",
            text: "Once canceled, this reservation will be removed!",
            icon: "warning",
            buttons: ["Cancel", "Cancel Reservation"],
            dangerMode: true,
          }).then((willCancel) => {
            if (willCancel) {
              // User confirmed cancellation, send DELETE request
              axios
                .delete(`https://localhost:7173/api/Reservation/delete?id=${id}`)
                .then(() => {
                  // Remove the canceled booking from the state
                  setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking.id !== id)
                  );

                  swal("Reservation has been canceled!", {
                    icon: "success",
                  });
                })
                .catch((error) => {
                  console.error("Error canceling reservation:", error);
                  swal("Error canceling reservation!", {
                    icon: "error",
                  });
                });
            } else {
              swal("Reservation was not canceled.");
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching schedule details:", error);
      });
  };

  // Filter the bookings based on the traveler NIC and the schedule date
  const currentDate = new Date();
  const filteredBookings = bookings.filter((booking) => {
    // Check if traveler NIC is not null or undefined and contains the search query
    if (!travelerNics[booking.travellerId]) return false;

    const scheduleId = booking.scheduleId;
    if (!trainDetails[scheduleId]) return false;

    const scheduleDate = new Date(trainDetails[scheduleId].date);
    return (
      travelerNics[booking.travellerId].toLowerCase().includes(searchQuery.toLowerCase()) &&
      scheduleDate >= currentDate
    );
  });

  return (
    <>
      <div className="view-bookings-container train-background">
        <CustomAppBar />
        <NavBar />
        <div className="container mt-5" style={{ backgroundColor: 'white', padding: '15px' }}>
          <h2>View Bookings</h2>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control small-input"
                placeholder="Search by traveler NIC"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Traveler NIC</th>
                <th>Train Name</th>
                <th>Date</th>
                <th>Reservation Start</th>
                <th>Reservation End</th>
                <th>Number of Seats</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{travelerNics[booking.travellerId]}</td>
                  <td>{trainDetails[booking.scheduleId]?.trainName}</td>
                  <td>{trainDetails[booking.scheduleId]?.date}</td>
                  <td>{booking.reservationStart}</td>
                  <td>{booking.reservationEnd}</td>
                  <td>{booking.pax}</td>
                  <td>
                    <button
                      onClick={() => handleCancelReservation(booking.id, booking.scheduleId)}
                      className="btn btn-danger"
                    >
                      Cancel Reservation
                    </button>
                    <Link to={`/booking/edit/${booking.id}`}>
                      <FontAwesomeIcon icon={faEdit} className="edit-icon1" />
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
