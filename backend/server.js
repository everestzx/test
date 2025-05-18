const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./db');
require('./models/MembershipFormSubmission');
require('./models/LoanApplication');

// Import routes
const loginRoute = require('./routes/login');
const userRoutes = require('./routes/users');
const membershipRoutes = require('./routes/membershipRoutes');
const loanRoutes = require('./routes/loanRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoute);
app.use('/api/members', membershipRoutes);
app.use('/api/loans', loanRoutes);

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
