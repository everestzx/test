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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Over the Counter');
  const [paymentNote, setPaymentNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
          const approved = userLoans.filter((loan) => loan.status === 'Approved' || loan.status === 'Disbursed');

          // Process all loans with calculated payment details and fetch remaining balance
          const processedApprovedLoansPromises = approved.map(async (loan) => {
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

            // Fetch payments for this loan to calculate remaining balance
            let remainingBalance = principal;
            let totalPaid = 0;

            try {
              const paymentResponse = await axios.get(`/api/payments/loan/${loan.id}/balance`);
              if (paymentResponse.data && paymentResponse.data.success) {
                totalPaid = parseFloat(paymentResponse.data.totalPaid) || 0;

                // Calculate total amount with interest
                const monthlyInterestRate = interestRate / 100 / 12;
                const totalPayable = principal * (1 + monthlyInterestRate * loanTermMonths);

                // Remaining balance with interest
                remainingBalance = totalPayable - totalPaid;
                if (remainingBalance < 0) remainingBalance = 0;
              }
            } catch (err) {
              console.error('Error fetching loan balance:', err);
              // If there's an error, calculate with interest as fallback
              const monthlyInterestRate = interestRate / 100 / 12;
              remainingBalance = principal * (1 + monthlyInterestRate * loanTermMonths);
            }

            return {
              id: loan.id,
              trackingNumber: loan.trackingNumber,
              loanProduct: loan.loanProduct,
              loanAmount: principal,
              monthlyPayment: monthlyPayment,
              interestRate: interestRate,
              paymentDuration: loanTermMonths,
              remainingBalance: remainingBalance,
              totalPaid: totalPaid,
              paidPercentage: (totalPaid / principal) * 100,
            };
          });

          const processedApprovedLoans = await Promise.all(processedApprovedLoansPromises);

          setUserData({
            username: `${userData.first_name || ''} ${userData.last_name || ''}`,
            memberSince: memberSince,
            membershipID: userData.membership_number || 'N/A',
          });

          setApprovedLoans(processedApprovedLoans);

          // Format the loans data for display in the table
          const formattedLoans = userLoans.map((loan) => ({
            id: loan.id,
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
  }, [paymentSuccess]);

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

  // Handle opening payment modal
  const handleOpenPaymentModal = (loanId) => {
    setSelectedLoanId(loanId);
    setShowPaymentModal(true);
    setPaymentAmount('');
    setPaymentMethod('Over the Counter');
    setPaymentNote('');
    setPaymentSuccess(false);
  };

  // Handle closing payment modal
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedLoanId(null);
  };

  // Handle payment submission
  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const userId = localStorage.getItem('user_id');

      // Find the selected loan to check remaining balance
      const selectedLoan = approvedLoans.find((loan) => loan.id === selectedLoanId);
      const paymentAmt = parseFloat(paymentAmount);

      // Validate payment amount doesn't exceed remaining balance
      if (selectedLoan && paymentAmt > selectedLoan.remainingBalance) {
        alert(`Payment amount exceeds the remaining balance. Maximum payment allowed is ₱${selectedLoan.remainingBalance.toFixed(2)}`);
        setIsProcessing(false);
        return;
      }

      const paymentData = {
        loan_id: selectedLoanId,
        user_id: parseInt(userId),
        payment_amount: paymentAmt,
        payment_method: paymentMethod,
        notes: paymentNote,
      };

      const response = await axios.post('/api/payments', paymentData);

      if (response.data && response.data.success) {
        setPaymentSuccess(true);
        setTimeout(() => {
          setShowPaymentModal(false);
          setSelectedLoanId(null);
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
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
                <span className="amount">
                  ₱{' '}
                  {typeof loan.remainingBalance === 'number'
                    ? loan.remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : '0.00'}
                </span>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${Math.min(loan.paidPercentage, 100)}%` }} />
                </div>
                <div className="progress-info">
                  <span>{loan.paidPercentage.toFixed(0)}% paid</span>
                  <span>
                    ₱{' '}
                    {typeof loan.totalPaid === 'number'
                      ? loan.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : '0.00'}{' '}
                    of ₱{' '}
                    {(() => {
                      const principal = loan.loanAmount;
                      const monthlyInterestRate = loan.interestRate / 100 / 12;
                      const loanTermMonths = loan.paymentDuration;
                      const totalPayable = principal * (1 + monthlyInterestRate * loanTermMonths);

                      return typeof totalPayable === 'number'
                        ? totalPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : '0.00';
                    })()}
                  </span>
                </div>
              </div>
              <div className="summary-box">
                <span className="label">Next Payment</span>
                <span className="amount">
                  ₱{' '}
                  {typeof loan.monthlyPayment === 'number'
                    ? loan.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : '0.00'}
                </span>
                <button onClick={() => handleOpenPaymentModal(loan.id)} className="make-payment-btn">
                  Make Payment
                </button>
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
                    <td>{loan.status === 'Approved' || loan.status === 'Disbursed' ? `${getLoanInterestRate(loan.loanProduct)}%` : '-'}</td>
                    <td>{loan.status === 'Approved' || loan.status === 'Disbursed' ? loan.loanTerm || '-' : '-'}</td>
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="payment-modal-header">
              <h3>Make a Payment</h3>
              <button className="close-modal" onClick={handleClosePaymentModal}>
                ×
              </button>
            </div>

            {paymentSuccess ? (
              <div className="payment-success">
                <div className="success-icon">✓</div>
                <h4>Payment Successful!</h4>
                <p>Your payment has been received.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitPayment} className="payment-form">
                <div className="form-group">
                  <label htmlFor="payment-amount">Payment Amount (₱)</label>
                  <input
                    id="payment-amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="payment-method">Payment Method</label>
                  <select id="payment-method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                    <option value="Over the Counter">Over the Counter</option>
                    <option value="Fund Transfer">Fund Transfer</option>
                    <option value="Online Payment">Online Payment</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="payment-note">Note (Optional)</label>
                  <textarea
                    id="payment-note"
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                    placeholder="Add note about this payment"
                  />
                </div>

                <button type="submit" className="submit-payment-btn" disabled={isProcessing || !paymentAmount}>
                  {isProcessing ? 'Processing...' : 'Submit Payment'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDash;
