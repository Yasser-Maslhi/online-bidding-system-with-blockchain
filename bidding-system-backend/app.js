// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./dbConnect');
require('dotenv').config();

// Load environment variables
const PORT = process.env.PORT || 3000;

// Create an Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Load routes
const bidRoutes = require('./routes/bidRoutes');
app.use('/bids', bidRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
