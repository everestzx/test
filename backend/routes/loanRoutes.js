const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Create a new loan application
router.post('/application', loanController.createLoanApplication);

// Get all loan applications
router.get('/all', loanController.getAllLoans);

// Get recent loan applications
router.get('/recent', loanController.getRecentLoans);

// Get pending loan applications
router.get('/pending', loanController.getPendingLoans);

// Get a specific loan application by ID
router.get('/:id', loanController.getLoanById);

// Approve a loan application
router.put('/:id/approve', loanController.approveLoan);

// Update loan status
router.put('/:id/status', loanController.updateLoanStatus);

// Delete a loan application
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
