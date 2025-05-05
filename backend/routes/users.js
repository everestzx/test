//users.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

router.post("/register", async (req, res) => {
  const { firstName, lastName, phone_number, birth_date, email, password } = req.body;

  if (!firstName || !lastName || !email || !password || !birth_date || !phone_number) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return res.status(500).json({ message: "Server error", error: err });

      if (results.length > 0) {
        return res.status(409).json({ message: "Email already registered" });
      }

      // Insert with exact column names
      const insertQuery = `
        INSERT INTO users 
          (first_name, last_name, email, password_hash, phone, birth_date)
        VALUES 
          (?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [firstName, lastName, email, hashedPassword, phone_number, birth_date],
        (err, result) => {
          if (err) {
            console.error("Insert error:", err);
            return res.status(500).json({ 
              message: "Error creating user",
              error: err.message,
              sqlError: err.sqlMessage  // Include SQL error for debugging
            });
          }

          const userId = result.insertId;

          // Update membership_number with exact column name
          const updateQuery = `
            UPDATE users SET membership_number = ? WHERE user_id = ?
          `;
          
          db.query(updateQuery, [userId, userId], (updateErr) => {
            if (updateErr) {
              console.error("Update membership error:", updateErr);
              return res.status(500).json({ 
                message: "Error setting membership number",
                error: updateErr.message,
                sqlError: updateErr.sqlMessage
              });
            }

            return res.status(201).json({ 
              message: "User registered successfully",
              userId: userId
            });
          });
        }
      );
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ 
      message: "Server error during registration",
      error: err.message 
    });
  }
});

module.exports = router;