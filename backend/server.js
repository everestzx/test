const express = require('express');
const cors = require('cors');
const app = express();


// Import routes
const loginRoute = require('./routes/login');
const userRoutes = require('./routes/users');
const membershipRoutes = require('./routes/membershipRoutes'); // ✅ Add this
// Middleware
app.use(cors());  // Only need this once
app.use(express.json());
// app.use('/api', require('./routes/membershipRoutes'));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoute);
app.use('/api', membershipRoutes); // ✅ Add this
// Start the server
const PORT = 5000;  // Changed to match listening port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
