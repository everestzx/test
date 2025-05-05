import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // ✅ Corrected import
import "../stylez/styles.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("userPhoto", "./images/default-user.png");
        localStorage.setItem("userRole", data.role || "user");

        if (rememberMe) {
          const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
          localStorage.setItem("expiresAt", expiresAt.toString());
        }

        setIsLoggedIn(true);
        alert("Login successful!");
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential); // ✅ Corrected usage
    const { email, name, picture } = decoded;

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("userPhoto", picture);

    try {
      const response = await fetch("http://localhost:5000/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, picture }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userRole", data.role || "user");
      } else {
        localStorage.setItem("userRole", "user");
      }
    } catch (err) {
      localStorage.setItem("userRole", "user");
    }

    setIsLoggedIn(true);
    alert("Google login successful!");
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="image-side">
          <img src="./images/Login-amico.svg" alt="Login Illustration" />
        </div>
        <div className="form-side">
          <div className="logo-wrapper" onClick={() => navigate("/")}>
            <img src="./images/logo.png" alt="Logo" />
          </div>
          <p className="motto">Empowering communities, one connection at a time.</p>
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="form">
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="checkbox-row">
              <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <label htmlFor="rememberMe">Remember me for 7 days</label>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Log In</button>
          </form>

          <div className="google-login">
            <p>Or log in with:</p>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert("Google login failed")} />
          </div>

          <p className="link-text">
            Don't have an account? <a href="/SignUp">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
