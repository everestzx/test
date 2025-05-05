const express = require('express');
const router = express.Router();
const { submitMembershipForm } = require('../controllers/membershipController');

router.post('/membership-applications', submitMembershipForm);

module.exports = router;
