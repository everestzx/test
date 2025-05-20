import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylez/MemberDash.css';

const MemberDash = () => {
  const [userData, setUserData] = useState({
    username: '',
    memberSince: '',
    membershipID: '',
  });
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse loan term string (e.g. "6 months", "12 months") to get the numeric value
  const parseLoanTerm = (loanTermString) => {
    if (!loanTermString) return 0;

    const match = loanTermString.match(/^(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return 0;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Get user information from localStorage
        const userId = localStorage.getItem('user_id');

        if (!userId) {
          setError('No user information found. Please log in again.');
          setLoading(false);
          return;
        }

        try {
          // Fetch user membership details
          const userResponse = await axios.get(`/api/members/${userId}`);
          const userData = userResponse.data;

          // Format the membership date
          const memberSince = userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A';

          // Fetch user's loans
          const loansResponse = await axios.get(`/api/loans/user/${userId}`);
          const userLoans = loansResponse.data;

          // Process all approved loans
          const approved = userLoans.filter((loan) => loan.status === 'Approved');

          // Process all loans with calculated payment details
          const processedApprovedLoans = approved.map((loan) => {
            const loanTermMonths = parseLoanTerm(loan.loanTerm);
            const interestRate = getLoanInterestRate(loan.loanProduct);
            const principal = parseFloat(loan.loanAmount);

            // Calculate monthly payment
            let monthlyPayment = 0;
            if (loanTermMonths > 0) {
              const monthlyInterestRate = interestRate / 100 / 12;

              if (monthlyInterestRate > 0) {
                // Compound interest formula (like a standard loan amortization)
                const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths);
                const denominator = Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1;
                monthlyPayment = numerator / denominator;
              } else {
                // Simple division if no interest rate is available
                monthlyPayment = principal / loanTermMonths;
              }
            }

            return {
              trackingNumber: loan.trackingNumber,
              loanProduct: loan.loanProduct,
              loanAmount: principal,
              monthlyPayment: monthlyPayment,
              interestRate: interestRate,
              paymentDuration: loanTermMonths,
            };
          });

          setUserData({
            username: `${userData.first_name || ''} ${userData.last_name || ''}`,
            memberSince: memberSince,
            membershipID: userData.membership_number || 'N/A',
          });

          setApprovedLoans(processedApprovedLoans);

          // Format the loans data for display in the table
          const formattedLoans = userLoans.map((loan) => ({
            trackingNumber: loan.trackingNumber,
            loanProduct: loan.loanProduct,
            loanAmount: parseFloat(loan.loanAmount),
            applicationDate: new Date(loan.application_date || loan.createdAt).toLocaleDateString(),
            status: loan.status,
            loanTerm: loan.loanTerm,
            loanTermMonths: parseLoanTerm(loan.loanTerm),
          }));

          setPendingLoans(formattedLoans);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load your information. Please try again later.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in fetchUserData:', err);
        setError('Failed to load your information. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Calculate the type-specific interest rate
  const getLoanInterestRate = (type) => {
    if (!type) return 0;

    switch (type.toLowerCase()) {
      case 'regular loan':
        return 2;
      case 'salary loan':
        return 3;
      case 'emergency loan':
        return 6;
      default:
        return 0;
    }
  };

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="member-dashboard">
      <div className="welcome-box">
        <h2>Welcome back, {userData.username}!</h2>
        <div className="member-info">
          <span>Member since: {userData.memberSince}</span>
          <span>Membership ID: {userData.membershipID}</span>
        </div>
      </div>

      {approvedLoans.length > 0 ? (
        approvedLoans.map((loan, index) => (
          <div className="loan-summary-card" key={index}>
            <h3>
              {loan.trackingNumber} | {loan.loanProduct}
            </h3>
            <div className="summary-section">
              <div className="summary-box">
                <span className="label">Current Balance</span>
                <span className="amount">₱ {typeof loan.loanAmount === 'number' ? loan.loanAmount.toLocaleString() : '0'}</span>
              </div>
              <div className="summary-box">
                <span className="label">Next Payment</span>
                <span className="amount">₱ {typeof loan.monthlyPayment === 'number' ? loan.monthlyPayment.toLocaleString() : '0'}</span>
              </div>
            </div>
            <div className="loan-details">
              <span>% Interest Rate: {loan.interestRate}%</span>
              <span>Payment Duration: {loan.paymentDuration} Months</span>
            </div>
          </div>
        ))
      ) : (
        <div className="no-loans-message">
          <p>You have no active loans.</p>
        </div>
      )}

      <div className="pending-loans-section">
        <h3>Loan Applications</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Tracking No.</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Interest</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {pendingLoans && pendingLoans.length > 0 ? (
                pendingLoans.map((loan, index) => (
                  <tr key={index}>
                    <td>{loan.trackingNumber}</td>
                    <td>{loan.loanProduct}</td>
                    <td>₱ {typeof loan.loanAmount === 'number' ? loan.loanAmount.toLocaleString() : '0'}</td>
                    <td>{loan.applicationDate}</td>
                    <td>
                      <span className={`status-badge ${loan.status.toLowerCase()}`}>{loan.status}</span>
                    </td>
                    <td>{loan.status === 'Approved' ? `${getLoanInterestRate(loan.loanProduct)}%` : '-'}</td>
                    <td>{loan.status === 'Approved' ? loan.loanTerm || '-' : '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No pending loan applications
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberDash;
