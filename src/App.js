import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import "@material/react-material-icon/index.scss";
import "./style.scss";

//import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MainNavigation from "./layout/MainNavigation";
import AuthService from "./services/auth.service";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <MainNavigation />
          <div className="layout-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<AuthPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
