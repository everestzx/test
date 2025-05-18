import React from 'react';
import '../stylez/LoanApplicationForm.css';

const LoanApplicationView = ({ formData }) => {
  return (
    <div className="loan-form-container read-only-mode">
      <h2 className="loan-form-title">Loan Application Requirements</h2>
      
      <div className="loan-form-section">
        <h3 className="loan-section-title">Personal Information</h3>

        <div className="loan-form-group">
          <label>Borrower Name *</label>
          <div className="read-only-value">{formData.borrowerName || 'N/A'}</div>
        </div>

        <div className="loan-form-group">
          <label>Client ID *</label>
          <div className="read-only-value">{formData.clientId || 'Not assigned yet'}</div>
        </div>

        <div className="loan-form-group">
          <label>Permanent Address *</label>
          <div className="read-only-value">{formData.address || 'N/A'}</div>
        </div>

        <div className="loan-form-row">
          <div className="loan-form-group small">
            <label>Years of Stay</label>
            <div className="read-only-value">{formData.lengthOfStayYears || '0'}</div>
          </div>
          <div className="loan-form-group small">
            <label>Months of Stay</label>
            <div className="read-only-value">{formData.lengthOfStayMonths || '0'}</div>
          </div>
        </div>
{/*manual input*/}
        <div className="loan-form-group">
          <label>Contact No *</label>
          <div className="read-only-value">{formData.contactNo || 'Not assigned yet'}</div>
        </div>

        <div className="loan-form-group">
          <label>Contact No *</label>
          <div className="read-only-value">{formData.tin || 'Not assigned yet'}</div>
        </div>

        <div className="loan-form-group">
          <label>Age *</label>
          <div className="read-only-value">{formData.age || 'Not assigned yet'}</div>
        </div>

        <div className="loan-form-group">
          <label>Gender *</label>
          <div className="read-only-value">{formData.gender|| 'Not assigned yet'}</div>
        </div>

        <div className="loan-form-group">
          <label>Birthdate *</label>
          <div className="read-only-value">{formData.birthdate || 'Not assigned yet'}</div>
        </div>

        <div className="loan-form-group">
          <label>Civil Status *</label>
          <div className="read-only-value">{formData.civilStatus || 'Not assigned yet'}</div>
        </div>

        <div className="loan-form-row">
            <div className="loan-form-group">
                <label>Spouse Name</label>
            <div className="read-only-value">{formData.spouseName|| 'Not assigned yet'}</div>
            </div>
            <div className="loan-form-group">
                <label>Spouse Occupation</label>
            <div className="read-only-value">{formData.spouseOccupation|| 'Not assigned yet'}</div>
            </div>
        </div>
        
        <div className="loan-form-group">
          <label>Occupation </label>
      x   <div className="read-only-value">{formData.occupation || 'Not assigned yet'}</div>
        </div>

        <div className="loan-form-section">
            <h3 className="loan-section-title">Loan Details</h3>

            <div className="loan-form-group">
                <label>Loan Product *</label>
                <div className="read-only-value">{formData.loanProduct || 'Not assigned yet'}</div>
            </div>
            <div className="loan-form-row">
                <div className="loan-form-group">
                 <label>Loan Amount *</label>
                 <div className="read-only-value">{formData.loanAmount || 'Not assigned yet'}</div>
                </div>
                <div className="loan-form-group">

                 <label>Loan Amount (In Words) *</label>
                 <div className="read-only-value">{formData.loanAmountWords || 'Not assigned yet'}</div>
                </div>
            </div>

            <div className="loan-form-row">
                <div className="loan-form-group">
                 <label>Loan Term *</label>
                    <div className="read-only-value">{formData.loanTerm || 'Not assigned yet'}</div>
                </div>
                <div className="loan-form-group">
                    <label>Payout Preference *</label>
                 <div className="read-only-value">{formData.payoutPreference|| 'Not assigned yet'}</div>
                </div>
                <div className="loan-form-group">
                    <label>Payment Mode *</label>
                 <div className="read-only-value">{formData.paymentMode|| 'Not assigned yet'}</div>
                </div>
            </div>

        </div>

        <div className="loan-form-group">
            <label>Loan Purpose *</label>
                <div className="read-only-value">{formData.loanPurpose|| ' '}</div>
        </div>


        {/* Add all remaining fields following the same pattern */}
    </div>

      <div className="loan-form-notice">
        <p>You need to be a registered member to submit a loan application.</p>
        <button className="loan-submit-button" onClick={() => window.location.href = '/membership'}>
          Become a Member
        </button>
      </div>
    </div>
  );
};

export default LoanApplicationView;