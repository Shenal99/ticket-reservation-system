import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import "../../res/css/editTraveler.css"; // Import the CSS file
import NavBar from "./TravelerNavBar";
import CustomAppBar from "../AppBar";

export default function EditTraveler() {
  const { id } = useParams();
  const [traveler, setTraveler] = useState({
    name: "",
    nic: "",
    email: "",
    phone: "",
    pwrd: "",
    status: 0,
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7173/api/Traveller/get?id=${id}`)
      .then((response) => {
        setTraveler(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  function updateTraveler(e) {
    e.preventDefault();

    axios
      .post(`https://localhost:7173/api/Traveller/edit?id=${id}`, traveler)
      .then((response) => {
        if (response.status === 200) {
          swal({
            title: "Success",
            text: "Traveler Successfully Updated",
            icon: "success",
            type: "success",
          }).then(function () {
            // Redirect to the traveler list or any other desired page
            window.location.href = "/traveler/view";
          });
        } else {
          swal("Traveler Update Failed!");
        }
      })
      .catch((error) => {
        console.error(error);
        swal("Traveler Update Failed!");
      });
  }

  return (
    <>
      <CustomAppBar />
      <NavBar />
      <div className="create-traveler-container">
        <div className="create-traveler-form">
          <h2>Edit Traveler</h2>
          <form onSubmit={updateTraveler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={traveler.name}
                onChange={(e) =>
                  setTraveler({ ...traveler, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nic">NIC</label>
              <input
                type="text"
                name="nic"
                className="form-control"
                value={traveler.nic}
                onChange={(e) =>
                  setTraveler({ ...traveler, nic: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={traveler.email}
                onChange={(e) =>
                  setTraveler({ ...traveler, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={traveler.phone}
                onChange={(e) =>
                  setTraveler({ ...traveler, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                className="form-control"
                value={traveler.pwrd}
                onChange={(e) =>
                  setTraveler({ ...traveler, pwrd: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Traveler</button>
          </form>
        </div>
      </div>
    </>
  );
}
