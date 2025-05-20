const express = require('express');
const router = express.Router();
const { submitMembershipForm, getRecentMembers, getAllMembers, getMemberByUserId } = require('../controllers/membershipController');

router.post('/membership-applications', submitMembershipForm);
router.get('/recent', getRecentMembers);
router.get('/all', getAllMembers);
router.get('/:userId', getMemberByUserId);

module.exports = router;
