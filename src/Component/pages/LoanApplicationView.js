import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit2, FiArrowLeft, FiCheck, FiX, FiDollarSign } from 'react-icons/fi';
import '../stylez/LoanApplicationForm.css';

const LoanApplicationView = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await axios.get(`/api/loans/${id}`);
        setLoan(response.data);
      } catch (err) {
        setError('Error fetching loan application details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id]);

  const handleStatusChange = async (status) => {
    try {
      await axios.put(`/api/loans/${id}/status`, { status });
      // Update the local state to reflect the change
      setLoan({ ...loan, status });
    } catch (error) {
      console.error('Error updating loan status:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="loading-container">Loading loan details...</div>;
  }

  if (error || !loan) {
    return <div className="error-container">{error || 'Loan application not found'}</div>;
  }

  return (
    <div className="loan-view-container">
      <div className="view-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <h1>Loan Application Details</h1>
        <div className="action-buttons">
          <button className="edit-button" onClick={() => navigate(`/LoanApplicationForm/edit/${id}`)}>
            <FiEdit2 /> Edit
          </button>
        </div>
      </div>

      <div className="loan-status-banner">
        <div className="tracking-number">
          <span className="label">Tracking Number:</span>
          <span className="value">{loan.trackingNumber || 'N/A'}</span>
        </div>
        <div className="status-wrapper">
          <span className="label">Status:</span>
          <span className={`status-badge ${loan.status?.toLowerCase()}`}>{loan.status || 'Pending'}</span>
        </div>
        <div className="status-actions">
          {loan.status !== 'Approved' && (
            <button className="status-btn approve" onClick={() => handleStatusChange('Approved')} title="Approve Loan">
              <FiCheck /> Approve
            </button>
          )}
          {loan.status !== 'Rejected' && (
            <button className="status-btn reject" onClick={() => handleStatusChange('Rejected')} title="Reject Loan">
              <FiX /> Reject
            </button>
          )}
          {loan.status === 'Approved' && (
            <button className="status-btn disburse" onClick={() => handleStatusChange('Disbursed')} title="Mark as Disbursed">
              <FiDollarSign /> Mark as Disbursed
            </button>
          )}
        </div>
      </div>

      <div className="loan-details-container">
        <div className="loan-section">
          <h2>Personal Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="label">Borrower Name</span>
              <span className="value">{loan.borrowerName}</span>
            </div>
            <div className="detail-item">
              <span className="label">Client ID</span>
              <span className="value">{loan.clientId}</span>
            </div>
            <div className="detail-item">
              <span className="label">Address</span>
              <span className="value">{loan.address}</span>
            </div>
            <div className="detail-item">
              <span className="label">Length of Stay</span>
              <span className="value">
                {loan.lengthOfStayYears} years, {loan.lengthOfStayMonths} months
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Contact Number</span>
              <span className="value">{loan.contactNo}</span>
            </div>
            <div className="detail-item">
              <span className="label">TIN</span>
              <span className="value">{loan.tin}</span>
            </div>
            <div className="detail-item">
              <span className="label">Age</span>
              <span className="value">{loan.age}</span>
            </div>
            <div className="detail-item">
              <span className="label">Gender</span>
              <span className="value">{loan.gender}</span>
            </div>
            <div className="detail-item">
              <span className="label">Birthdate</span>
              <span className="value">{formatDate(loan.birthdate)}</span>
            </div>
            <div className="detail-item">
              <span className="label">Civil Status</span>
              <span className="value">{loan.civilStatus}</span>
            </div>
            {loan.civilStatus === 'Married' && (
              <>
                <div className="detail-item">
                  <span className="label">Spouse Name</span>
                  <span className="value">{loan.spouseName || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Spouse Occupation</span>
                  <span className="value">{loan.spouseOccupation || 'N/A'}</span>
                </div>
              </>
            )}
            <div className="detail-item">
              <span className="label">Occupation</span>
              <span className="value">{loan.occupation || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="loan-section">
          <h2>Loan Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="label">Loan Product</span>
              <span className="value">{loan.loanProduct}</span>
            </div>
            <div className="detail-item">
              <span className="label">Loan Amount</span>
              <span className="value">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(loan.loanAmount)}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Amount in Words</span>
              <span className="value">{loan.loanAmountWords}</span>
            </div>
            <div className="detail-item">
              <span className="label">Loan Term</span>
              <span className="value">{loan.loanTerm}</span>
            </div>
            <div className="detail-item">
              <span className="label">Payment Mode</span>
              <span className="value">{loan.paymentMode}</span>
            </div>
            <div className="detail-item">
              <span className="label">Payout Preference</span>
              <span className="value">{loan.payoutPreference}</span>
            </div>
            <div className="detail-item wide">
              <span className="label">Loan Purpose</span>
              <span className="value">{loan.loanPurpose}</span>
            </div>
            <div className="detail-item">
              <span className="label">Application Date</span>
              <span className="value">{formatDate(loan.application_date)}</span>
            </div>
            <div className="detail-item">
              <span className="label">Submitted On</span>
              <span className="value">{formatDate(loan.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationView;
