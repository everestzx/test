import React from 'react';
import ReactDOM from 'react-dom/client';
import './web.css'; // Import the CSS file

const myElement = (
  <header className="header">
    {/* Logo */}
    <div className="logo-container">
      <img src="/logo.png" alt="Logo" className="logo" />
    </div>

    {/* Navbar */}
    <nav className="navbar">
      <a href="#products" className="nav-link">Product and Services</a>
      <a href="#membership" className="nav-link">Membership Form</a>
      <a href="#about" className="nav-link">About Us</a>
    </nav>
  </header>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);
