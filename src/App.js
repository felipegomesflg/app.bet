import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import "@material/react-material-icon/index.scss";
import "./style.scss";

//import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MainNavigation from "./layout/MainNavigation";
import AuthService from "./services/auth.service";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <div className="App">
      <div
        className={`container ${
          window.location.pathname == "/login" ? "login" : ""
        }`}
      >
        <Router>
          <MainNavigation />
          <div className="layout-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/my-account" element={<AccountPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
