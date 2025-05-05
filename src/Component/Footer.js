import React from 'react';
import './stylez/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section about">
          <h3>PASCCO</h3>
          <p>Empowering our members through shared values and community-driven growth.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/membership">Membership</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>Email: ---------</p>
          <p>Phone: -----------</p>
          <p>Address:--------</p>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="/"><i className="fab fa-facebook-f" /></a>
            <a href="/"><i className="fab fa-twitter" /></a>
            <a href="/"><i className="fab fa-linkedin-in" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} YourCoop Name. All rights reserved.</p>
        <div className="footer-legal">
          <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
