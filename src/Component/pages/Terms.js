import React from "react";
import '../stylez/Terms.css';

const Terms = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>Terms and Conditions</h1>
        <p>
          Welcome to our cooperative! By using this service, you agree to the
          following terms and conditions:
        </p>
        <ul>
          <li>You will use this platform responsibly.</li>
          <li>Your personal data is stored securely and handled with care.</li>
          <li>You agree not to misuse or exploit the platform for illegal activity.</li>
          <li>All users must be respectful and follow our community guidelines.</li>
          <li>These terms may change, and continued use means acceptance of updates.</li>
        </ul>
        <p>Thank you for being part of our community!</p>
      </div>
    </div>
  );
};

export default Terms;