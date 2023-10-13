import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";

export default function BookingConfirmationModal(props) {
  const [travellerId, setTravellerId] = useState("");
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const [nicList, setNicList] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7173/api/Traveller")
      .then((response) => response.json())
      .then((data) => {
        const nics = data.map((traveller) => ({
          value: traveller.id,
          label: traveller.nic,
        }));
        setNicList(nics);
      })
      .catch((error) => {
        console.error("Error fetching NIC numbers:", error);
      });
  }, []);

  const handleClose = () => {
    setTravellerId("");
    setStartDestination("");
    setEndDestination("");
    setNumberOfSeats("");
    props.onClose();
  };

  const handleConfirmBooking = () => {
    if (isNaN(numberOfSeats)) {
      Swal.fire("Invalid Input", "Number of seats must be a valid number.", "error");
      return;
    }

    const seats = parseInt(numberOfSeats);

    if (seats < 1 || seats > 4) {
      Swal.fire("Invalid Input", "Number of seats must be between 1 and 4.", "error");
      return;
    }

    const bookingData = {
      travellerId: travellerId.value,
      scheduleId: props.scheduleId,
      reservationStart: startDestination,
      reservationEnd: endDestination,
      pax: seats,
    };

    // Display a confirmation dialog with SweetAlert
    Swal.fire({
      title: "Confirm Booking",
      text: "Are you sure you want to confirm this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    })
      .then((result) => {
        if (result.isConfirmed) {
          // If the user confirms, make a POST request to confirm the booking
          fetch("https://localhost:7173/api/Reservation/create", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          })
            .then((response) => {
              if (response.ok) {
                // Handle success here with SweetAlert
                Swal.fire({
                  title: "Booking Confirmed",
                  text: "Your booking has been confirmed successfully.",
                  icon: "success",
                }).then(() => {
                  handleClose(); // Close the modal
                });
              } else {
                // Handle error here with SweetAlert
                Swal.fire("Booking Confirmation Failed", "Please try again later.", "error");
              }
            })
            .catch((error) => {
              // Handle error here with SweetAlert
              Swal.fire("Booking Confirmation Failed", "Please try again later.", "error");
            });
        }
      })
      .catch((error) => {
        // Handle error with SweetAlert
        Swal.fire("Error", "An error occurred. Please try again later.", "error");
      });
  };

  return (
    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Train Name: {props.trainName}</p>
        <p>Destination: {props.startDestination} to {props.endDestination}</p>
        <p>Start Time: {props.startTime}</p>
        <Form>
          <Form.Group controlId="travellerId">
            <Form.Label>Traveller</Form.Label>
            <Select
              options={nicList}
              value={travellerId}
              onChange={(selectedOption) => setTravellerId(selectedOption)}
              isSearchable={true}
              placeholder="Select Traveller"
            />
          </Form.Group>
          <Form.Group controlId="startDestination">
            <Form.Label>Start Destination</Form.Label>
            <Form.Control
              as="select"
              value={startDestination}
              onChange={(e) => setStartDestination(e.target.value)}
            >
              <option value="">Select Start Destination</option>
              {props.stationList.map((station) => (
                <option key={station.name} value={station.name}>
                  {station.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="endDestination">
            <Form.Label>End Destination</Form.Label>
            <Form.Control
              as="select"
              value={endDestination}
              onChange={(e) => setEndDestination(e.target.value)}
            >
              <option value="">Select End Destination</option>
              {props.stationList.map((station) => (
                <option key={station.name} value={station.name}>
                  {station.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="numberOfSeats">
            <Form.Label>Number of Seats</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Number of Seats"
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirmBooking}>
          Confirm Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

