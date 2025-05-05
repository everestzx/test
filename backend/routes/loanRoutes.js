const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/loan-applications', loanController.createLoanApplication);

module.exports = router;
