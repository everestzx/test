import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Component/pages/Home";
import Dashboard from "./Component/pages/Dashboard";
import SignUp from "./Component/pages/SignUp";
import AboutUs from "./Component/pages/AboutUs";
import MembershipForm from "./Component/pages/MembershipForm";
import Login from "./Component/pages/Login";
import Signup from "./Component/pages/SignUp";
import LoanApplicationForm from "./Component/pages/LoanApplicationForm";
import Terms from "./Component/pages/Terms";
import FAQ from "./Component/pages/FAQ";
import Services from "./Component/pages/Services";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const expiresAt = parseInt(localStorage.getItem("expiresAt"), 10);

    if (storedLogin === "true" && (!expiresAt || Date.now() < expiresAt)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("customer_id");
      localStorage.removeItem("expiresAt");
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/FAQ" element={<FAQ />} />

        <Route
          path="/membership-form"
          element={
            <ProtectedRoute>
              <MembershipForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loan-application-form"
          element={
            <ProtectedRoute>
              <LoanApplicationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/terms"
          element={
            <ProtectedRoute>
              <Terms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
