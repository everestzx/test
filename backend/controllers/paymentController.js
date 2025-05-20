const LoanPayment = require('../models/LoanPayment');
const LoanApplication = require('../models/LoanApplication');
const { Op } = require('sequelize');
const sequelize = require('../db');

// Generate a unique transaction reference
const generateTransactionRef = () => {
  const prefix = 'PAY';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { loan_id, user_id, payment_amount, payment_method, notes } = req.body;

    // Validate required fields
    if (!loan_id || !user_id || !payment_amount || !payment_method) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Check if loan exists and is approved
    const loan = await LoanApplication.findOne({
      where: {
        id: loan_id,
        user_id: user_id,
        status: {
          [Op.in]: ['Approved', 'Disbursed'],
        },
      },
    });

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Valid loan not found or not approved',
      });
    }

    // Create payment with transaction reference
    const payment = await LoanPayment.create({
      loan_id,
      user_id,
      payment_amount,
      payment_method,
      payment_date: new Date(),
      transaction_reference: generateTransactionRef(),
      payment_status: 'Completed',
      notes: notes || null,
    });

    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully',
      data: payment,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error recording payment',
      error: error.message,
    });
  }
};

// Get all payments for a specific loan
exports.getLoanPayments = async (req, res) => {
  try {
    const { loanId } = req.params;

    const payments = await LoanPayment.findAll({
      where: { loan_id: loanId },
      order: [['payment_date', 'DESC']],
    });

    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching loan payments:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving payments',
      error: error.message,
    });
  }
};

// Get all payments for a specific user
exports.getUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;

    const payments = await LoanPayment.findAll({
      where: { user_id: userId },
      order: [['payment_date', 'DESC']],
    });

    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching user payments:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving payments',
      error: error.message,
    });
  }
};

// Get loan remaining balance (calculated from payments)
exports.getLoanRemainingBalance = async (req, res) => {
  try {
    const { loanId } = req.params;

    // Get the loan
    const loan = await LoanApplication.findByPk(loanId);
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found',
      });
    }

    // Get sum of all payments for this loan
    const payments = await LoanPayment.findAll({
      where: {
        loan_id: loanId,
        payment_status: 'Completed',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('payment_amount')), 'total_paid']],
      raw: true,
    });

    // Calculate interest rate based on loan product
    let interestRate = 0;
    const loanProduct = loan.loanProduct ? loan.loanProduct.toLowerCase() : '';

    if (loanProduct === 'regular loan') {
      interestRate = 2;
    } else if (loanProduct === 'salary loan') {
      interestRate = 3;
    } else if (loanProduct === 'emergency loan') {
      interestRate = 6;
    }

    // Parse loan term to get number of months
    let loanTermMonths = 12; // Default to 12 months
    if (loan.loanTerm) {
      const match = loan.loanTerm.match(/^(\d+)/);
      if (match && match[1]) {
        loanTermMonths = parseInt(match[1], 10);
      }
    }

    const totalPaid = payments[0].total_paid || 0;
    const principal = parseFloat(loan.loanAmount);

    // Calculate total amount with interest
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayable = principal * (1 + monthlyInterestRate * loanTermMonths);

    // Remaining balance with interest
    let remainingBalance = totalPayable - totalPaid;
    if (remainingBalance < 0) remainingBalance = 0;

    res.status(200).json({
      success: true,
      loanAmount: principal,
      totalPaid,
      remainingBalance,
      totalPayable,
      interestRate,
    });
  } catch (error) {
    console.error('Error calculating remaining balance:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating remaining balance',
      error: error.message,
    });
  }
};
