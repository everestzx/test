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

// Add a function to get a member by user ID
exports.getMemberByUserId = async (req, res) => {
  console.log('Fetching member by user ID:', req.params); // Debugging line

  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const member = await MembershipFormSubmission.findOne({
      where: { user_id: userId },
      attributes: ['id', 'first_name', 'last_name', 'user_id', 'status', 'createdAt', 'email', 'mobile_number'],
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found',
      });
    }

    // Format the response
    const formattedMember = {
      id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      mobile_number: member.mobile_number,
      membership_number: `MB-${member.user_id.toString().padStart(6, '0')}`,
      status: member.status,
      createdAt: member.createdAt,
    };

    res.status(200).json(formattedMember);
  } catch (error) {
    console.error('Error fetching member by user ID:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching member details',
      error: error.message,
    });
  }
};
//membershipController.js
