import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { Route, Switch } from "react-router";

import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import CreateTraveler from "./components/TravelerManagement/CreateTraveler";
import ViewTravelers from "./components/TravelerManagement/ViewTravelers";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/traveler/create" element={<CreateTraveler />} />
          <Route path="/traveler/view" element={<ViewTravelers />} />
        </Routes>
      </Router>
  );
}

export default App;