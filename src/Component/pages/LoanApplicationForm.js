import React, { useState } from 'react';
import '../stylez/LoanApplicationForm.css';

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    customer_id: localStorage.getItem("customer_id") || "",
    application_date: new Date().toISOString().split("T")[0],
    borrowerName: '',
    clientId: '',
    address: '',
    lengthOfStayYears: '',
    lengthOfStayMonths: '',
    contactNo: '',
    tin: '',
    age: '',
    gender: '',
    spouseName: '',
    occupation: '',
    birthdate: '',
    civilStatus: '',
    spouseOccupation: '',
    loanProduct: '',
    loanAmount: '',
    loanAmountWords: '',
    loanTerm: '',
    payoutPreference: '',
    paymentMode: '',
    loanPurpose: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.borrowerName) newErrors.borrowerName = 'Borrower Name is required';
    if (!formData.clientId) newErrors.clientId = 'Client ID is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.contactNo) newErrors.contactNo = 'Contact No. is required';
    if (!formData.tin) newErrors.tin = 'TIN is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
    if (!formData.civilStatus) newErrors.civilStatus = 'Civil Status is required';
    if (!formData.loanProduct) newErrors.loanProduct = 'Loan Product is required';
    if (!formData.loanAmount) newErrors.loanAmount = 'Loan Amount is required';
    if (!formData.loanAmountWords) newErrors.loanAmountWords = 'Loan Amount in Words is required';
    if (!formData.loanTerm) newErrors.loanTerm = 'Loan Term is required';
    if (!formData.payoutPreference) newErrors.payoutPreference = 'Payout Preference is required';
    if (!formData.paymentMode) newErrors.paymentMode = 'Payment Mode is required';
    if (!formData.loanPurpose) newErrors.loanPurpose = 'Loan Purpose is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/loan-applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
          alert("Loan Application Submitted!");
          setFormData({
            customer_id: localStorage.getItem("customer_id") || "",
            application_date: new Date().toISOString().split("T")[0],
            borrowerName: '',
            clientId: '',
            address: '',
            lengthOfStayYears: '',
            lengthOfStayMonths: '',
            contactNo: '',
            tin: '',
            age: '',
            gender: '',
            spouseName: '',
            occupation: '',
            birthdate: '',
            civilStatus: '',
            spouseOccupation: '',
            loanProduct: '',
            loanAmount: '',
            loanAmountWords: '',
            loanTerm: '',
            payoutPreference: '',
            paymentMode: '',
            loanPurpose: ''
          });
        } else {
          alert("Submission failed: " + data.message);
        }
      } catch (err) {
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="loan-form-container">
      <h2 className="loan-form-title">Loan Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="loan-form-group">
          <label>Borrower Name *</label>
          <input name="borrowerName" value={formData.borrowerName} onChange={handleChange} className={errors.borrowerName ? 'error' : ''} />
          {errors.borrowerName && <div className="error-message">{errors.borrowerName}</div>}
        </div>

        <div className="loan-form-group">
          <label>Client ID *</label>
          <input name="clientId" value={formData.clientId} onChange={handleChange} className={errors.clientId ? 'error' : ''} />
          {errors.clientId && <div className="error-message">{errors.clientId}</div>}
        </div>

        <div className="loan-form-group">
          <label>Permanent Address *</label>
          <input name="address" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>

        <div className="loan-form-row">
          <div className="loan-form-group small">
            <label>Years of Stay</label>
            <input name="lengthOfStayYears" value={formData.lengthOfStayYears} onChange={handleChange} />
          </div>
          <div className="loan-form-group small">
            <label>Months of Stay</label>
            <input name="lengthOfStayMonths" value={formData.lengthOfStayMonths} onChange={handleChange} />
          </div>
        </div>

        <div className="loan-form-group">
          <label>Contact No *</label>
          <input name="contactNo" value={formData.contactNo} onChange={handleChange} className={errors.contactNo ? 'error' : ''} />
          {errors.contactNo && <div className="error-message">{errors.contactNo}</div>}
        </div>

        <div className="loan-form-group">
          <label>TIN *</label>
          <input name="tin" value={formData.tin} onChange={handleChange} className={errors.tin ? 'error' : ''} />
          {errors.tin && <div className="error-message">{errors.tin}</div>}
        </div>

        <div className="loan-form-group">
          <label>Age *</label>
          <input name="age" value={formData.age} onChange={handleChange} className={errors.age ? 'error' : ''} />
          {errors.age && <div className="error-message">{errors.age}</div>}
        </div>

        <div className="loan-form-group">
          <label>Gender *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? 'error' : ''}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <div className="error-message">{errors.gender}</div>}
        </div>

        <div className="loan-form-group">
          <label>Birthdate *</label>
          <input name="birthdate" type="date" value={formData.birthdate} onChange={handleChange} className={errors.birthdate ? 'error' : ''} />
          {errors.birthdate && <div className="error-message">{errors.birthdate}</div>}
        </div>

        <div className="loan-form-group">
          <label>Civil Status *</label>
          <select name="civilStatus" value={formData.civilStatus} onChange={handleChange} className={errors.civilStatus ? 'error' : ''}>
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
          </select>
          {errors.civilStatus && <div className="error-message">{errors.civilStatus}</div>}
        </div>

        <div className="loan-form-row">
          <div className="loan-form-group">
            <label>Spouse Name</label>
            <input name="spouseName" value={formData.spouseName} onChange={handleChange} />
          </div>
          <div className="loan-form-group">
            <label>Spouse Occupation</label>
            <input name="spouseOccupation" value={formData.spouseOccupation} onChange={handleChange} />
          </div>
        </div>

        <div className="loan-form-group">
          <label>Occupation</label>
          <input name="occupation" value={formData.occupation} onChange={handleChange} />
        </div>

        <div className="loan-form-section">
          <h3 className="loan-section-title">Loan Details</h3>

          <div className="loan-form-group">
            <label>Loan Product *</label>
            <select name="loanProduct" value={formData.loanProduct} onChange={handleChange} className={errors.loanProduct ? 'error' : ''}>
              <option value="">Select</option>
              <option value="Regular Loan">Regular Loan</option>
              <option value="Salary Loan">Salary Loan</option>
              <option value="Emergency Loan">Emergency Loan</option>
              <option value="Others">Others</option>
            </select>
            {errors.loanProduct && <div className="error-message">{errors.loanProduct}</div>}
          </div>

          <div className="loan-form-row">
            <div className="loan-form-group">
              <label>Loan Amount (PHP) *</label>
              <input name="loanAmount" type="number" value={formData.loanAmount} onChange={handleChange} className={errors.loanAmount ? 'error' : ''} />
              {errors.loanAmount && <div className="error-message">{errors.loanAmount}</div>}
            </div>
            <div className="loan-form-group">
              <label>Loan Amount (In Words) *</label>
              <input name="loanAmountWords" value={formData.loanAmountWords} onChange={handleChange} className={errors.loanAmountWords ? 'error' : ''} />
              {errors.loanAmountWords && <div className="error-message">{errors.loanAmountWords}</div>}
            </div>
          </div>

          <div className="loan-form-row">
            <div className="loan-form-group">
              <label>Loan Term *</label>
              <select name="loanTerm" value={formData.loanTerm} onChange={handleChange} className={errors.loanTerm ? 'error' : ''}>
                <option value="">Select</option>
                <option value="6 months">6 months</option>
                <option value="12 months">12 months</option>
                <option value="Others">Others</option>
              </select>
              {errors.loanTerm && <div className="error-message">{errors.loanTerm}</div>}
            </div>
            <div className="loan-form-group">
              <label>Payout Preference *</label>
              <select name="payoutPreference" value={formData.payoutPreference} onChange={handleChange} className={errors.payoutPreference ? 'error' : ''}>
                <option value="">Select</option>
                <option value="Cash out">Cash Out</option>
                <option value="Others">Others</option>
              </select>
              {errors.payoutPreference && <div className="error-message">{errors.payoutPreference}</div>}
            </div>
            <div className="loan-form-group">
              <label>Payment Mode *</label>
              <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className={errors.paymentMode ? 'error' : ''}>
                <option value="">Select</option>
                <option value="Over the Counter">Over the Counter</option>
                <option value="Fund Transfer">Fund Transfer</option>
                <option value="Others">Others</option>
              </select>
              {errors.paymentMode && <div className="error-message">{errors.paymentMode}</div>}
            </div>
          </div>

          <div className="loan-form-group">
            <label>Loan Purpose *</label>
            <textarea name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} className={errors.loanPurpose ? 'error' : ''} />
            {errors.loanPurpose && <div className="error-message">{errors.loanPurpose}</div>}
          </div>
        </div>

        <div className="loan-form-footer">
          <button type="submit" className="loan-submit-button">Submit Application</button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
