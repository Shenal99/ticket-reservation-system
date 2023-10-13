import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../res/css/login.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pwrd, setPwrd] = useState("");
    const [confirmPwrd, setConfirmPwrd] = useState("");
    const [error, setError] = useState(""); // Add error state

    function registerUser() {
        setError(""); // Clear any previous error messages

        if (pwrd !== confirmPwrd) {
            setError("Passwords do not match.");
            return;
        }

        // Basic email format validation
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            setError("Invalid email address format.");
            return;
        }

        // Password length validation (you can adjust the minimum length as needed)
        if (pwrd.length < 6) {
            setError("Password should be at least 6 characters.");
            return;
        }

        const data = {
            name,
            role: 2, // Set the role to 2 by default
            email,
            phone,
            pwrd,
            status: 1,
        };

        axios
            .post("https://localhost:7173/api/User/register", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.status === 201) {
                    // Handle registration success
                    swal("Registration Successful", "You are now registered!", "success").then(() => {
                        // Navigate to the login page using window.location.href
                        window.location.href = "/login";
                    });
                } else {
                    swal("Registration Failed", response.data, "error");
                }
            })
            .catch((error) => {
                console.error("Registration Error", error);
                swal("Registration Failed", "An error occurred while registering", "error");
            });
    }

    return (
        <>
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">
                            <div className="px-5 ms-xl-4">
                                <div
                                    className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                                    style={{ color: "#709085" }}
                                ></div>
                            </div>

                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <Form style={{ width: "23rem" }}>
                                    <h1 className="fw-normal mb-3 pb-3">Register</h1>

                                    <Form.Group className="mb-4">
                                        <Form.Control
                                            type="text"
                                            placeholder="Full Name"
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email address"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Control
                                            type="tel"
                                            placeholder="Phone"
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setPwrd(e.target.value);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={(e) => {
                                                setConfirmPwrd(e.target.value);
                                            }}
                                        />
                                    </Form.Group>

                                    {error && <div className="text-danger mb-4">{error}</div>}

                                    <div className="pt-1 mb-4">
                                        <Button
                                            variant="info"
                                            size="lg"
                                            block
                                            onClick={registerUser}
                                        >
                                            Register
                                        </Button>
                                    </div>

                                    <p className="small mb-5 pb-lg-2">
                                        Already have an account? <Link to="/login">Sign In</Link>
                                    </p>
                                </Form>
                            </div>
                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img
                                src={require("../res/images/train.jpg")}
                                alt="Login image"
                                className="w-100 vh-100"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
