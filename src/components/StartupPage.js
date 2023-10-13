import React from "react";
import { Link } from "react-router-dom";
import "../res/css/startup.css";

export default function StartupPage() {
    return (
        <div className="startup-container">
            <div className="startup-background">
                <div className="startup-content">
                    <h1 className="startup-heading">Welcome to Sri Lanka Railways</h1>
                    <p className="startup-paragraph">Online Train Seats Reservation</p>
                    <Link to="/login" className="startup-link">
                        <button className="start-now-button">Start Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
