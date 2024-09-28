const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bidRoutes = require('./routes/bidRoutes');
const blockchainController = require('./controllers/blockchainController');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/users', userRoutes);
app.use('/bids', bidRoutes);

// Blockchain route
app.get('/blockchain/status', blockchainController.getBlockchainStatus);

const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
