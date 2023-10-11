import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { Route, Switch } from "react-router";

import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import CreateTraveler from "./components/TravelerManagement/CreateTraveler";
import ViewTravelers from "./components/TravelerManagement/ViewTravelers";
import EditTraveler from "./components/TravelerManagement/EditTraveler";
import AccountActivation from "./components/TravelerManagement/AccountActivation";
import CreateTrainSchedule from "./components/TrainManagement/CreateTrainSchedule";
import ViewTrainSchedules from "./components/TrainManagement/ViewTrainSchedules";
import EditTrainSchedule from "./components/TrainManagement/EditTrainSchedules";
import TrainScheduleActivation from "./components/TrainManagement/TrainScheduleactivation";
import ViewSchedules from "./components/BookingManagement/ViewSchedules";
import ViewBookings from "./components/BookingManagement/ViewBookings";

function App() {
  return (
      <Router>
        <Routes>
          //TravelerManagement
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/traveler/create" element={<CreateTraveler />} />
          <Route path="/traveler/view" element={<ViewTravelers />} />
          <Route path="/traveler/edit/:id" element={<EditTraveler />} />
          <Route path="/traveler/activation" element={<AccountActivation />} />

          //TrainScheduleManagement
          <Route path="/schedule/create" element={<CreateTrainSchedule />} />
          <Route path="/schedule/view" element={<ViewTrainSchedules />} />
          <Route path="/schedule/edit/:id" element={<EditTrainSchedule />} />
          <Route path="/schedule/activation" element={<TrainScheduleActivation />} />

          //BookingManagement
          <Route path="/booking/view" element={<ViewSchedules />} />
          <Route path="/booking/management" element={<ViewBookings />} />
        </Routes>
      </Router>
  );
}

export default App;