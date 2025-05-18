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

exports.getRecentMembers = async (req, res) => {
  try {
    // Fetch the membership submissions with all the fields we need
    const members = await MembershipFormSubmission.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'first_name', 'last_name', 'user_id', 'status'],
    });

    // Format the response to match the required structure
    const formattedMembers = members.map((member) => ({
      id: member.id,
      name: `${member.first_name} ${member.last_name}`,
      membership_no: `MB-${member.user_id.toString().padStart(6, '0')}`, // Create a formatted membership number
      status: member.status,
    }));

    res.status(200).json(formattedMembers);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Error fetching members', error: error.message });
  }
};

// Add a new function to get all members, not just recent ones
exports.getAllMembers = async (req, res) => {
  try {
    const members = await MembershipFormSubmission.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'first_name', 'last_name', 'user_id', 'status'],
    });

    const formattedMembers = members.map((member) => ({
      id: member.id,
      name: `${member.first_name} ${member.last_name}`,
      membership_no: `MB-${member.user_id.toString().padStart(6, '0')}`,
      status: member.status,
    }));

    res.status(200).json(formattedMembers);
  } catch (error) {
    console.error('Error fetching all members:', error);
    res.status(500).json({ message: 'Error fetching all members', error: error.message });
  }
};
//membershipController.js
