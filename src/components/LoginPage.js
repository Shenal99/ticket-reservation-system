import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../res/css/login.css";

export default function LoginPage() {
  const [uname, setUname] = useState("");
  const [pwrd, setPwrd] = useState("");
  const [error, setError] = useState(""); // Add error state for input validation

  function loginUser() {
    setError(""); // Clear any previous error messages

    // Input validation
    if (!uname || !pwrd) {
      setError("Please fill in both fields.");
      return;
    }

    const data = {
      username: uname,
      password: pwrd,
    };

    axios
      .post("https://localhost:7173/api/User/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === 1) {
            swal("Login Successful", "You are now logged in!", "success").then(
              function () {
                // Store the user's role in localStorage
                localStorage.setItem("userRole", response.data.role);

                window.location.href = "/home";
              }
            );
          } else {
            swal("Login Failed", "Invalid Username or Password", "error");
          }
        } else {
          swal("Login Failed", response.data, "error");
        }
      })
      .catch((error) => {
        console.error("Login Error", error);
        swal("Login Failed", "An error occurred while logging in", "error");
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
                <form style={{ width: "23rem" }}>
                  <h1 className="fw-normal mb-3 pb-3 ">Log in</h1>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example18"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setUname(e.target.value);
                      }}
                    />
                    <label className="form-label" htmlFor="form2Example18">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example28"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setPwrd(e.target.value);
                      }}
                    />
                    <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                  </div>

                  {error && <p className="text-danger">{error}</p>} {/* Display error message if input is not valid */}

                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      type="button"
                      onClick={loginUser}
                    >
                      Login
                    </button>
                  </div>

                  <p className="small mb-2">
                    Don't have an account? <Link to="/register">Register here</Link>
                  </p>

                  <p className="small">
                    <a className="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>
                </form>
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
