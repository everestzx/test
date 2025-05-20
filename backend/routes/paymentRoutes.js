const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create a new payment
router.post('/', paymentController.createPayment);

// Get all payments for a specific loan
router.get('/loan/:loanId', paymentController.getLoanPayments);

// Get all payments for a specific user
router.get('/user/:userId', paymentController.getUserPayments);

// Get loan remaining balance
router.get('/loan/:loanId/balance', paymentController.getLoanRemainingBalance);

module.exports = router;
