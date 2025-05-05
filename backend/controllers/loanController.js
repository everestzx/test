const LoanApplication = require('../models/LoanApplication');

exports.createLoanApplication = async (req, res) => {
  try {
    const loanApplication = await LoanApplication.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Loan application submitted successfully',
      data: loanApplication,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to submit loan application',
      error: error.message,
    });
  }
};
