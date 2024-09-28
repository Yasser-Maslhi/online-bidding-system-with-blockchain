const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bidRoutes = require('./routes/bidRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bidding-system', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/users', userRoutes);
app.use('/bids', bidRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
