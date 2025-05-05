import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylez/SignUp.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",  // Changed from firstName
    last_name: "",   // Changed from lastName
    phone: "",       // Changed from phone_number
    birth_date: "",  // Changed from birthdate
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.first_name) validationErrors.first_name = "First name is required";
    if (!formData.last_name) validationErrors.last_name = "Last name is required";
    if (!formData.phone) validationErrors.phone = "Phone number is required";
    if (!formData.birth_date) validationErrors.birth_date = "Birthdate is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!formData.password) validationErrors.password = "Password is required";
    if (formData.password.length < 8) validationErrors.password = "Password must be at least 8 characters long";
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Passwords do not match";

    if (!formData.agree) validationErrors.agree = "You must agree to the terms";

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.first_name,  // Maps to first_name in backend
          lastName: formData.last_name,   // Maps to last_name in backend
          phone_number: formData.phone,   // Maps to phone in backend
          birth_date: formData.birth_date,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input 
          type="text" 
          name="first_name" 
          placeholder="First Name" 
          value={formData.first_name} 
          onChange={handleChange} 
        />
        {errors.first_name && <p className="error">{errors.first_name}</p>}
      </div>
      <div className="input-group">
        <input 
          type="text" 
          name="last_name" 
          placeholder="Last Name" 
          value={formData.last_name} 
          onChange={handleChange} 
        />
        {errors.last_name && <p className="error">{errors.last_name}</p>}
      </div>
      <div className="input-group">
        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone Number" 
          value={formData.phone} 
          onChange={handleChange} 
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>
      <div className="input-group">
        <input 
          type="date" 
          name="birth_date" 
          value={formData.birth_date} 
          onChange={handleChange} 
        />
        {errors.birth_date && <p className="error">{errors.birth_date}</p>}
      </div>
      <div className="input-group">
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={formData.email} 
          onChange={handleChange} 
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="input-group">
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="input-group">
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>
      <div className="input-group checkbox">
        <label>
          <input 
            type="checkbox" 
            name="agree" 
            checked={formData.agree} 
            onChange={handleChange} 
          />
          I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">terms and conditions</a>
        </label>
        {errors.agree && <p className="error">{errors.agree}</p>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;