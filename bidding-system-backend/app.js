// // app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./dbConnect');
// require('dotenv').config();

// // Load environment variables
// const PORT = process.env.PORT || 3000;

// // Create an Express app
// const app = express();
// app.use(bodyParser.json());

// // Connect to MongoDB
// connectDB();

// // Load routes
// const bidRoutes = require('./routes/bidRoutes');
// app.use('/bids', bidRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// // app.js
// const express = require('express');
// const cors = require('cors'); // Import CORS middleware
// //const bodyParser = require('body-parser');
// const connectDB = require('./dbConnect');
// require('dotenv').config();

// // Load environment variables
// const PORT = process.env.PORT || 3000;

// // Create an Express app
// const app = express();
// // Enable CORS and specify the allowed origin
// app.use(cors({
//   origin: 'http://localhost:3001' // Allow requests from the frontend
// }));
// //app.use(bodyParser.json());
// app.use(express.json()); // Parse JSON bodies

// // Connect to MongoDB
// connectDB();

// // Load routes
// const bidRoutes = require('./routes/bidRoutes');
// const userRoutes = require('./routes/userRoutes'); // Import userRoutes

// app.use('/bids', bidRoutes);
// app.use('/users', userRoutes); // Use userRoutes for handling user registration and login


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./dbConnect');
require('dotenv').config();

// Load environment variables
const PORT = process.env.PORT || 3000;

// Create an Express app
const app = express();

// Enable CORS and specify the allowed origin
app.use(cors({
  origin: 'http://localhost:3001', // Adjust to match your frontend's address
  credentials: true, // Allow cookies and credentials
}));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Route imports
const bidRoutes = require('./routes/bidRoutes');
const userRoutes = require('./routes/userRoutes');

// Load routes
app.use('/bids', bidRoutes);
app.use('/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
