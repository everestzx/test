const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./db');
require('./models/MembershipFormSubmission');

// Import routes
const loginRoute = require('./routes/login');
const userRoutes = require('./routes/users');
const membershipRoutes = require('./routes/membershipRoutes'); // ✅ Add this
// Middleware
app.use(cors()); // Only need this once
app.use(express.json());
// app.use('/api', require('./routes/membershipRoutes'));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoute);
app.use('/api', membershipRoutes); // ✅ Add this

sequelize
  .sync()
  .then(() => {
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
