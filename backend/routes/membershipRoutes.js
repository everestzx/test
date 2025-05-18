const express = require('express');
const router = express.Router();
const { submitMembershipForm, getRecentMembers, getAllMembers } = require('../controllers/membershipController');

router.post('/membership-applications', submitMembershipForm);
router.get('/recent', getRecentMembers);
router.get('/all', getAllMembers);

module.exports = router;
