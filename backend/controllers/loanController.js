const LoanApplication = require('../models/LoanApplication');

// Generate a unique tracking number
const generateTrackingNumber = () => {
  const prefix = 'LOAN';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

exports.createLoanApplication = async (req, res) => {
  try {
    // Add tracking number to the loan application
    const loanData = {
      ...req.body,
      trackingNumber: generateTrackingNumber(),
    };

    const loanApplication = await LoanApplication.create(loanData);
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

// Get recent loan applications
exports.getRecentLoans = async (req, res) => {
  try {
    const recentLoans = await LoanApplication.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: ['id', 'borrowerName', 'loanProduct', 'loanAmount', 'status', 'trackingNumber', 'createdAt'],
    });

    res.status(200).json(recentLoans);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve recent loans',
      error: error.message,
    });
  }
};

// Get all loan applications
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await LoanApplication.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'borrowerName', 'loanProduct', 'loanAmount', 'status', 'trackingNumber', 'createdAt', 'application_date'],
    });

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve loans',
      error: error.message,
    });
  }
};

// Get pending loan applications
exports.getPendingLoans = async (req, res) => {
  console.log('Fetching pending loans...');

  try {
    const pendingLoans = await LoanApplication.findAll({
      where: { status: 'Pending' },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'borrowerName', 'loanProduct', 'loanAmount', 'status', 'trackingNumber', 'createdAt'],
    });

    res.status(200).json(pendingLoans);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve pending loans',
      error: error.message,
    });
  }
};

// Approve a loan application
exports.approveLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { loanTerm } = req.body; // Get loan term from request (e.g. "6 months", "12 months", "24 months")
    const loan = await LoanApplication.findByPk(id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan application not found',
      });
    }

    // Update loan with status and interest rate
    loan.status = 'Approved';

    // Update loan term if provided, otherwise keep existing value
    if (loanTerm) {
      loan.loanTerm = loanTerm;
    } else if (!loan.loanTerm) {
      // If loan term is not provided and not already set, default to "12 months"
      loan.loanTerm = '12 months';
    }

    await loan.save();

    res.status(200).json({
      success: true,
      message: 'Loan application approved successfully',
      data: loan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to approve loan application',
      error: error.message,
    });
  }
};

// Update loan status
exports.updateLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const loan = await LoanApplication.findByPk(id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan application not found',
      });
    }

    loan.status = status;
    await loan.save();

    res.status(200).json({
      success: true,
      message: 'Loan status updated successfully',
      data: loan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update loan status',
      error: error.message,
    });
  }
};

// Delete a loan application
exports.deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await LoanApplication.findByPk(id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan application not found',
      });
    }

    await loan.destroy();

    res.status(200).json({
      success: true,
      message: 'Loan application deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete loan application',
      error: error.message,
    });
  }
};

// Get a single loan application by ID
exports.getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await LoanApplication.findByPk(id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan application not found',
      });
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve loan application',
      error: error.message,
    });
  }
};

// Get all loan applications by user ID
exports.getLoansByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const userLoans = await LoanApplication.findAll({
      where: { user_id: userId },
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'borrowerName',
        'loanProduct',
        'loanAmount',
        'status',
        'trackingNumber',
        'createdAt',
        'application_date',
        'loanTerm',
      ],
    });

    res.status(200).json(userLoans);
  } catch (error) {
    console.error('Error fetching user loans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user loan applications',
      error: error.message,
    });
  }
};
