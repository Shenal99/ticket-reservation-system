import React, { useState, useEffect } from "react";
import NavBar from "./BookingNavBar";
import CustomAppBar from "../AppBar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch the list of bookings from your API
    axios.get("https://localhost:7173/api/Reservation").then((response) => {
      setBookings(response.data);
    });
  }, []);

  const handleDeleteBooking = (id) => {
    // Use SweetAlert for delete confirmation
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this booking!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // User confirmed deletion, send DELETE request
        axios
          .delete(`https://localhost:7173/api/Reservation/delete?id=${id}`)
          .then(() => {
            // Remove the deleted booking from the state
            setBookings((prevBookings) =>
              prevBookings.filter((booking) => booking.id !== id)
            );

            swal("Booking has been deleted!", {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting booking:", error);
            swal("Error deleting booking!", {
              icon: "error",
            });
          });
      } else {
        swal("Booking was not deleted.");
      }
    });
  };

  // Filter the bookings based on the search query
const filteredBookings = bookings.filter((booking) => {
    // Check if reservationStart, reservationEnd, or pax are null or undefined
    const startMatch =
      booking.reservationStart &&
      booking.reservationStart.toLowerCase().includes(searchQuery.toLowerCase());
    const endMatch =
      booking.reservationEnd &&
      booking.reservationEnd.toLowerCase().includes(searchQuery.toLowerCase());
    const paxMatch =
      booking.pax &&
      booking.pax.toString().toLowerCase().includes(searchQuery.toLowerCase());
  
    // Return true if any of the fields match the search query
    return startMatch || endMatch || paxMatch;
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
                placeholder="Search by reservation field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Reservation Start</th>
                <th>Reservation End</th>
                <th>Number of Pax</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.reservationStart}</td>
                  <td>{booking.reservationEnd}</td>
                  <td>{booking.pax}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="btn btn-danger"
                    >
                      <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                    </button>
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
