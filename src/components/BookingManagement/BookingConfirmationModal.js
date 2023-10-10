import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function BookingConfirmationModal(props) {
  const [nicNo, setNicNo] = useState("");
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [seatNo, setSeatNo] = useState("");

  const handleClose = () => {
    // Reset form fields and close the modal
    setNicNo("");
    setStartDestination("");
    setEndDestination("");
    setSeatNo("");
    props.onClose();
  };

  const handleConfirmBooking = () => {
    // Perform booking confirmation logic here, e.g., send data to the server
    const bookingData = {
      nicNo,
      startDestination,
      endDestination,
      seatNo,
      scheduleId: props.scheduleId, // Pass the schedule ID to identify the booking
    };

    // Call your API to confirm the booking with bookingData
    // ...

    // After successful booking, you can display a success message or handle as needed

    // Close the modal
    handleClose();
  };

  return (
    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Train Name: {props.trainName}</p>
        <p>Start Time: {props.startTime}</p>
        <Form>
          <Form.Group controlId="nicNo">
            <Form.Label>NIC No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter NIC No"
              value={nicNo}
              onChange={(e) => setNicNo(e.target.value)}
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
          <Form.Group controlId="seatNo">
            <Form.Label>Seat No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Seat No"
              value={seatNo}
              onChange={(e) => setSeatNo(e.target.value)}
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
