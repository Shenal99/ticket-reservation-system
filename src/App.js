import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { Route, Switch } from "react-router";

import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import CreateTraveler from "./components/TravelerManagement/CreateTraveler";
import ViewTravelers from "./components/TravelerManagement/ViewTravelers";
import EditTraveler from "./components/TravelerManagement/EditTraveler";
import AccountActivation from "./components/TravelerManagement/AccountActivation";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/traveler/create" element={<CreateTraveler />} />
          <Route path="/traveler/view" element={<ViewTravelers />} />
          <Route path="/traveler/edit/:id" element={<EditTraveler />} />
          <Route path="/traveler/activation" element={<AccountActivation />} />
        </Routes>
      </Router>
  );
}

export default App;