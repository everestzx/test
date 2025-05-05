import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './stylez/Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [formsDropdown, setFormsDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userPhoto = localStorage.getItem('userPhoto') || './images/default-user.png';
  const userName = localStorage.getItem('name')?.split(' ')[0] || ''; // Get first name only
  const isCustomPhoto = userPhoto !== './images/default-user.png';
  const userRole = localStorage.getItem('userRole') || 'user'; // Default to regular user if no role is set
  const isAdmin = userRole === 'admin';

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('customer_id');
    localStorage.removeItem('userPhoto');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src="./images/logo.png" alt="PASCCO Logo" className="logo-img" />
          PASCCO
        </Link>

        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {isAdmin && (
            <li className="nav-item">
              <Link to="/Dashboard" className="nav-links" onClick={closeMobileMenu}>
                Dashboard
              </Link>
            </li>
          )}

          <li className="nav-item" onMouseEnter={() => setFormsDropdown(true)} onMouseLeave={() => setFormsDropdown(false)}>
            <span className="nav-links">Online Forms</span>
            {formsDropdown && (
              <div className="dropdown-menu">
                <Link to="/membership-form" className="dropdown-link" onClick={closeMobileMenu}>
                  Membership Form
                </Link>
                <Link to="/loan-application-form" className="dropdown-link" onClick={closeMobileMenu}>
                  Loan Application Form
                </Link>
              </div>
            )}
          </li>

          <li className="nav-item">
            <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
              Services
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/about-us" className="nav-links" onClick={closeMobileMenu}>
              About Us
            </Link>
          </li>

          <li className="nav-item" onMouseEnter={() => setProfileDropdown(true)} onMouseLeave={() => setProfileDropdown(false)}>
            <div className="nav-photo profile-container">
              {isCustomPhoto && <span className="user-name">{userName}</span>}
              <img src={userPhoto} alt="User" className="profile-photo" />
              {profileDropdown && (
                <div className="profile-dropdown">
                  <button className="logout-button" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
