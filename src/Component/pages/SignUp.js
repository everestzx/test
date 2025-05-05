import React from "react";
import SignUpForm from "../pages/SignUpForm";
import { useNavigate } from "react-router-dom";
import '../stylez/styles.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="image-side">
          <img src="./images/Sign up-amico.svg" alt="Illustration" />
        </div>
        <div className="form-side">
          <div className="logo-wrapper" onClick={handleLogoClick}>
            <img src="./images/logo.png" alt="Logo" />
          </div>
          <p className="motto">Empowering communities, one connection at a time.</p>
          <h2>Sign Up</h2>
          <SignUpForm />
          <p className="link-text">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
