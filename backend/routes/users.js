//users.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const sequelize = require("../db");
const { QueryTypes } = require("sequelize");

router.post("/register", async (req, res) => {
  const { firstName, lastName, phone_number, birth_date, email, password } = req.body;

  if (!firstName || !lastName || !email || !password || !birth_date || !phone_number) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email already exists using Sequelize query
    const existingUsers = await sequelize.query("SELECT * FROM users WHERE email = :email", {
      replacements: { email: email },
      type: QueryTypes.SELECT,
    });

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Insert user with Sequelize query
    const insertResult = await sequelize.query(
      `INSERT INTO users 
        (first_name, last_name, email, password_hash, phone, birth_date)
      VALUES 
        (:firstName, :lastName, :email, :hashedPassword, :phone_number, :birth_date)`,
      {
        replacements: {
          firstName,
          lastName,
          email,
          hashedPassword,
          phone_number,
          birth_date,
        },
        type: QueryTypes.INSERT,
      }
    );

    const userId = insertResult[0]; // Get the inserted ID

    // Update membership_number with Sequelize query
    await sequelize.query(`UPDATE users SET membership_number = :userId WHERE user_id = :userId`, {
      replacements: { userId },
      type: QueryTypes.UPDATE,
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: userId,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({
      message: "Server error during registration",
      error: err.message,
    });
  }
});

module.exports = router;
