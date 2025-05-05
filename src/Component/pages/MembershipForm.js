import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylez/MembershipForm.css';

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    last_name: '',
    first_name: '',
    middle_name: '',
    suffix: '',
    civil_status: '',
    gender: '',
    weight: '',
    height: '',
    date_of_birth: '',
    age: '',
    tin: '',
    religion: '',
    household_size: '',
    sss: '',
    philhealth: '',
    umid: '',
    pag_ibig: '',
    philsys_id: '',
    passport_id: '',
    other_id: '',
    highest_education: '',
    school_last_attended: '',
    present_house_no: '',
    present_barangay: '',
    present_municipality: '',
    present_province: '',
    present_zip_code: '',
    permanent_house_no: '',
    permanent_barangay: '',
    permanent_municipality: '',
    permanent_province: '',
    permanent_zip_code: '',
    residence_ownership: '',
    mobile_number: '',
    email: '',
    facebook: '',
    occupation: '',
    employer: '',
    job_title: '',
    employer_contact: '',
    date_hired: '',
    employer_address: '',
    monthly_income: '',
    employment_status: '',
    business_name: '',
    business_address: '',
    business_owners: '',
    self_employed: '',
    business_product: '',
    business_monthly_income: '',
    spouse_last_name: '',
    spouse_first_name: '',
    spouse_middle_name: '',
    spouse_suffix: '',
    spouse_date_of_birth: '',
    spouse_occupation: '',
    spouse_monthly_income: '',
    spouse_other_income: '',
    spouse_father_name: '',
    spouse_mother_name: '',
    spouse_mobile_number: '',
    spouse_employer: '',
    spouse_employer_contact: '',
    spouse_employer_address: '',
    spouse_employment_status: '',
    spouse_job_title: '',
    spouse_date_hired: '',
    beneficiary1_name: '',
    beneficiary1_birthdate: '',
    beneficiary1_relationship: '',
    beneficiary2_name: '',
    beneficiary2_birthdate: '',
    beneficiary2_relationship: '',
    beneficiary3_name: '',
    beneficiary3_birthdate: '',
    beneficiary3_relationship: '',
    recruiter_name: '',
    recruiter_address: '',
    recruiter_pb_no: '',
    agree_terms: false,
    status: 'PENDING'
  });

  const [submitMessage, setSubmitMessage] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  // Common options
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const religionOptions = [
    'Roman Catholic',
    'Islam',
    'Iglesia ni Cristo',
    'Evangelical',
    'Protestant',
    'Aglipayan',
    'Baptist',
    'Methodist',
    'Seventh-day Adventist',
    'Other'
  ];

  // Get user_id from localStorage
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      setFormData(prev => ({
        ...prev,
        user_id: userId
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setSubmissionError('');

    // Basic validation
    if (!formData.last_name || !formData.first_name || !formData.email) {
      setSubmissionError('Please fill in all required fields (Last Name, First Name, Email).');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/membership-applications', formData);
      
      setSubmitMessage(response.data.message);
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setSubmissionError(
          `Submission failed. Server responded with status ${error.response.status}: ${error.response.data.message || 'An unexpected error occurred on the server.'}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in Node.js
        setSubmissionError('Submission failed. No response received from the server. Please check your internet connection or the server status.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setSubmissionError(`Submission failed. An error occurred while setting up the request: ${error.message}`);
      }
    }
  };

  const renderInput = (label, name, type = 'text') => (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input type={type} id={name} name={name} value={formData[name]} onChange={handleChange} />
    </div>
  );

  const renderSelect = (label, name, options) => (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <select id={name} name={name} value={formData[name]} onChange={handleChange}>
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  // Clear spouse info if Single
  useEffect(() => {
    if (formData.civil_status === 'Single') {
      setFormData(prev => ({
        ...prev,
        spouse_last_name: '',
        spouse_first_name: '',
        spouse_middle_name: '',
        spouse_suffix: '',
        spouse_date_of_birth: '',
        spouse_occupation: '',
        spouse_monthly_income: '',
        spouse_other_income: '',
        spouse_father_name: '',
        spouse_mother_name: '',
        spouse_mobile_number: '',
        spouse_employer: '',
        spouse_employer_contact: '',
        spouse_employer_address: '',
        spouse_employment_status: '',
        spouse_job_title: '',
        spouse_date_hired: ''
      }));
    }
  }, [formData.civil_status]);

  // Clear business info if not self-employed
  useEffect(() => {
    if (formData.self_employed !== 'Yes') {
      setFormData(prev => ({
        ...prev,
        business_name: '',
        business_address: '',
        business_owners: '',
        business_product: '',
        business_monthly_income: ''
      }));
    }
  }, [formData.self_employed]);

  // Clear employment info if self-employed
  useEffect(() => {
    if (formData.self_employed === 'Yes') {
      setFormData(prev => ({
        ...prev,
        employer: '',
        job_title: '',
        employer_contact: '',
        date_hired: '',
        employer_address: '',
        employment_status: ''
      }));
    }
  }, [formData.self_employed]);

  return (
    <form onSubmit={handleSubmit} className="membership-form">
      <h1>Membership Application</h1>
      <h2>Complete the form below</h2>

      <div className="form-section">
        <h3>Personal Information</h3>
        {renderInput('Last Name', 'last_name')}
        {renderInput('First Name', 'first_name')}
        {renderInput('Middle Name', 'middle_name')}
        {renderInput('Suffix', 'suffix')}
        {renderSelect('Civil Status', 'civil_status', ['Single', 'Married', 'Widowed', 'Separated', 'Divorced'])}
        {renderSelect('Gender', 'gender', genderOptions)}
        {renderInput('Weight (kg)', 'weight', 'number')}
        {renderInput('Height (cm)', 'height', 'number')}
        {renderInput('Date of Birth', 'date_of_birth', 'date')}
        {renderInput('Age', 'age', 'number')}
        {renderInput('TIN', 'tin')}
        {renderSelect('Religion', 'religion', religionOptions)}
        {renderInput('Household Size', 'household_size', 'number')}
        {renderInput('SSS', 'sss')}
        {renderInput('PhilHealth', 'philhealth')}
        {renderInput('UMID', 'umid')}
        {renderInput('PAG-IBIG', 'pag_ibig')}
        {renderInput('Philsys ID', 'philsys_id')}
        {renderInput('Passport ID', 'passport_id')}
        {renderInput('Other ID', 'other_id')}
        {renderInput('Highest Education', 'highest_education')}
        {renderInput('School Last Attended', 'school_last_attended')}
      </div>

      <div className="form-section">
        <h3>Contact & Address</h3>
        {renderInput('Present House No.', 'present_house_no')}
        {renderInput('Present Barangay', 'present_barangay')}
        {renderInput('Present Municipality', 'present_municipality')}
        {renderInput('Present Province', 'present_province')}
        {renderInput('Present Zip Code', 'present_zip_code')}
        {renderInput('Permanent House No.', 'permanent_house_no')}
        {renderInput('Permanent Barangay', 'permanent_barangay')}
        {renderInput('Permanent Municipality', 'permanent_municipality')}
        {renderInput('Permanent Province', 'permanent_province')}
        {renderInput('Permanent Zip Code', 'permanent_zip_code')}
        {renderSelect('Residence Ownership', 'residence_ownership', ['Owned', 'Rented', 'Living with Relatives', 'Other'])}
        {renderInput('Mobile Number', 'mobile_number', 'tel')}
        {renderInput('Email', 'email', 'email')}
        {renderInput('Facebook', 'facebook')}
      </div>

      <div className="form-section">
        <h3>Employment</h3>
        {renderInput('Occupation', 'occupation')}
        {formData.self_employed !== 'Yes' && (
          <>
            {renderInput('Employer', 'employer')}
            {renderInput('Job Title', 'job_title')}
            {renderInput('Employer Contact', 'employer_contact')}
            {renderInput('Date Hired', 'date_hired', 'date')}
            {renderInput('Employer Address', 'employer_address')}
            {renderSelect('Employment Status', 'employment_status', ['Regular', 'Contractual', 'Probationary', 'Part-time', 'Other'])}
          </>
        )}
        {renderInput('Monthly Income', 'monthly_income', 'number')}
        {renderSelect('Self Employed?', 'self_employed', ['Yes', 'No'])}
      </div>

      {formData.self_employed === 'Yes' && (
        <div className="form-section">
          <h3>Business Information</h3>
          {renderInput('Business Name', 'business_name')}
          {renderInput('Business Address', 'business_address')}
          {renderInput('Business Owners', 'business_owners')}
          {renderInput('Business Product', 'business_product')}
          {renderInput('Business Monthly Income', 'business_monthly_income', 'number')}
        </div>
      )}

      {formData.civil_status !== 'Single' && (
        <div className="form-section">
          <h3>Spouse Information</h3>
          {renderInput('Spouse Last Name', 'spouse_last_name')}
          {renderInput('Spouse First Name', 'spouse_first_name')}
          {renderInput('Spouse Middle Name', 'spouse_middle_name')}
          {renderInput('Spouse Suffix', 'spouse_suffix')}
          {renderInput('Spouse Date of Birth', 'spouse_date_of_birth', 'date')}
          {renderInput('Spouse Occupation', 'spouse_occupation')}
          {renderInput('Spouse Monthly Income', 'spouse_monthly_income', 'number')}
          {renderInput('Spouse Other Income', 'spouse_other_income', 'number')}
          {renderInput('Spouse Father Name', 'spouse_father_name')}
          {renderInput('Spouse Mother Name', 'spouse_mother_name')}
          {renderInput('Spouse Mobile Number', 'spouse_mobile_number', 'tel')}
          {renderInput('Spouse Employer', 'spouse_employer')}
          {renderInput('Spouse Employer Contact', 'spouse_employer_contact')}
          {renderInput('Spouse Employer Address', 'spouse_employer_address')}
          {renderSelect('Spouse Employment Status', 'spouse_employment_status', ['Regular', 'Contractual', 'Probationary', 'Part-time', 'Other'])}
          {renderInput('Spouse Job Title', 'spouse_job_title')}
          {renderInput('Spouse Date Hired', 'spouse_date_hired', 'date')}
        </div>
      )}

      <div className="form-section">
        <h3>Beneficiaries</h3>
        {renderInput('Beneficiary 1 Name', 'beneficiary1_name')}
        {renderInput('Beneficiary 1 Birthdate', 'beneficiary1_birthdate', 'date')}
        {renderInput('Beneficiary 1 Relationship', 'beneficiary1_relationship')}
        {renderInput('Beneficiary 2 Name', 'beneficiary2_name')}
        {renderInput('Beneficiary 2 Birthdate', 'beneficiary2_birthdate', 'date')}
        {renderInput('Beneficiary 2 Relationship', 'beneficiary2_relationship')}
        {renderInput('Beneficiary 3 Name', 'beneficiary3_name')}
        {renderInput('Beneficiary 3 Birthdate', 'beneficiary3_birthdate', 'date')}
        {renderInput('Beneficiary 3 Relationship', 'beneficiary3_relationship')}
      </div>

      <div className="form-section">
        <h3>Recruiter Info</h3>
        {renderInput('Recruiter Name', 'recruiter_name')}
        {renderInput('Recruiter Address', 'recruiter_address')}
        {renderInput('Recruiter PB No.', 'recruiter_pb_no')}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="agree_terms"
            checked={formData.agree_terms}
            onChange={handleChange}
            required
          />
          I agree to the terms and conditions.
        </label>
      </div>
      <button type="submit">Submit</button>
      {submitMessage && <p className="submit-message success">{submitMessage}</p>}
      {submissionError && <p className="submit-message error">{submissionError}</p>}
    </form>
  );
};

export default MembershipForm;