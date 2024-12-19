// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const checkinRoutes = require('./routes/checkin');

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());
app.use('/api', checkinRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/checkincheckout')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
