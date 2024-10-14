const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bidRoutes = require('./routes/bidRoutes');
const { run } = require('./dbConnect')
const app = express();
app.use(bodyParser.json());
run().catch(console.dir)


app.use('/users', userRoutes);
app.use('/bids', bidRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
