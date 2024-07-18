const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Bid = require('./models/Bid');
const app = express();

mongoose.connect('mongodb://localhost:27017/bidding-system', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Create a new bid
app.post('/bids', async (req, res) => {
    const { itemId, userId, amount } = req.body;
    const bid = new Bid({ itemId, userId, amount });
    await bid.save();
    res.status(201).send('Bid placed');
});

// View all bids
app.get('/bids', async (req, res) => {
    const bids = await Bid.find();
    res.json(bids);
});

app.listen(3001, () => {
    console.log('Bidding Service running on port 3001');
});
