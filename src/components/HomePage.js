import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../res/css/home.css";
import CustomAppBar from "./AppBar";

export default function Home() {
  const imageSize = { height: "400px" };
  const [userRole, setUserRole] = useState(0);

  useEffect(() => {
    // Retrieve the user's role from localStorage
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole) {
      setUserRole(parseInt(storedUserRole, 10));
    }
  }, []);

  return (
    <>
      <div className="train-background">
        <CustomAppBar />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card mb-4">
                <img
                  src={require("../res/images/traveler.avif")}
                  alt="Traveler Management"
                  className="card-img-top"
                  style={imageSize}
                />
                <div className="card-body">
                  <h5 className="card-title">Traveler Management</h5>
                  <p className="card-text">
                    Manage your travelers' information here.
                  </p>
                  <Link to="/traveler/create" className="btn btn-primary">
                    Go to Traveler Management
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <img
                  src={require("../res/images/ticket.jpg")}
                  alt="Ticket Booking Management"
                  className="card-img-top"
                  style={imageSize}
                />
                <div className="card-body">
                  <h5 className="card-title">Ticket Booking Management</h5>
                  <p className="card-text">
                    Manage ticket bookings and reservations.
                  </p>
                  <Link to="/booking/view" className="btn btn-primary">
                    Go to Ticket Booking
                  </Link>
                </div>
              </div>
            </div>
            {userRole === 1 && (
              <div className="col-md-4">
                <div className="card mb-4">
                  <img
                    src={require("../res/images/trainF.jpg")}
                    alt="Train Management"
                    className="card-img-top"
                    style={imageSize}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Train Management</h5>
                    <p className="card-text">
                      Manage train schedules and information.
                    </p>
                    <Link to="/schedule/create" className="btn btn-primary">
                      Go to Train Management
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
