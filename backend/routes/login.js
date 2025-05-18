const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const sequelize = require("../db"); 
const { QueryTypes } = require("sequelize");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  console.log(req.body);

  try {
    const users = await sequelize.query("SELECT * FROM users WHERE email = ?", {
      replacements: [email],
      type: QueryTypes.SELECT,
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const role = user.role || "user"; // Default to 'user' if role is not set (for members/non-members)

    res.json({
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      user_id: user.user_id,
      role: role,
    });
  } catch (err) {
    console.error("Unexpected error during login:", err); // log full error to terminal
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
