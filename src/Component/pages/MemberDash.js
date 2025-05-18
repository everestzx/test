import React from 'react';
import '../stylez/MemberDash.css'; // 

const MemberDash = ({
  username,
  memberSince,
  membershipID,
  currentBalance,
  nextPayment,
  interestRate,
  monthsRemaining,
  benefits
}) => {
  return (
    <div className="member-dashboard">
      <div className="welcome-box">
        <h2>Welcome back, {username}!</h2>
        <div className="member-info">
          <span>Member since: {memberSince}</span>
          <span>Membership ID: {membershipID}</span>
        </div>
      </div>

      <div className="loan-summary-card">
        <h3>₱ Loan Summary</h3>
        <div className="summary-section">
          <div className="summary-box">
            <span className="amount">
            ₱ {typeof currentBalance === 'number' ? currentBalance.toLocaleString() : '0'}
            </span>
          </div>
          <div className="summary-box">
           <span className="amount">
            ₱ {typeof nextPayment === 'number' ? nextPayment.toLocaleString() : '0'}
            </span>
          </div>
        </div>
        <div className="loan-details">
          <span>% Interest Rate: {interestRate}%</span>
          <span>Months Remaining: {monthsRemaining} Months</span>
        </div>
      </div>

      <div className="member-benefits">
        <h3>Member Benefits</h3>
        <ul>
          {benefits && benefits.length > 0 ? (
            benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))
          ) : (
            <li>No benefits listed.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MemberDash;
