import React from 'react';
import '../stylez/Services.css';

export default function Services() {
  return (
    <div className="services-wrapper">
      <div className="header-section">
        <p className="breadcrumb">Products & Services</p>
        <h1 className="page-title">Loans</h1>
        <p className="intro-text">
          Whether you're looking to fund your personal aspirations, or start or expand your business, 
          our diverse range of loan options empowers you to pursue your goals with confidence, 
          providing flexible terms and competitive rates.
        </p>
      </div>

      <div className="loan-cards-grid">
        <div className="loan-card">
          <h3>Regular Loans</h3>
          <p>
            <strong>Purpose:</strong> Business capital, educational expenses, housing renovation, etc. <br />
            <strong>Loanable Amount:</strong> Based on member’s shared capital and repayment capacity.<br />
            <strong>Interest Rate:</strong> <br />
            <strong>Repayment Terms:</strong> Up to 12 months.
          </p>
        </div>

        <div className="loan-card">
          <h3>Emergency Loans</h3>
          <p>
            <strong>Purpose:</strong> Medical expenses, urgent family needs, calamity recovery funds, etc. <br />
            <strong>Loanable Amount:</strong> Fast approval for up to a fixed capacity.<br />
            <strong>Interest Rate:</strong> <br />
            <strong>Repayment Terms:</strong> Up to 6 months.
          </p>
        </div>

        <div className="loan-card">
          <h3>Salary Loans</h3>
          <p>
            <strong>Purpose:</strong> For salaried employees requiring short-term financial support.<br />
            <strong>Eligibility:</strong> Proof of regular employment required.<br />
            <strong>Loanable Amount:</strong> Based on monthly income.<br />
            <strong>Repayment Terms:</strong> Payroll deducted, Up to 9 months.
          </p>
        </div>
      </div>
    </div>
  );
}
