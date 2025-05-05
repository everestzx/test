const MembershipFormSubmission = require('../models/MembershipFormSubmission');

exports.submitMembershipForm = async (req, res) => {
  try {
    const form = await MembershipFormSubmission.create(req.body);
    res.status(201).json({ message: 'Form submitted successfully', data: form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
};
//membershipController.js
