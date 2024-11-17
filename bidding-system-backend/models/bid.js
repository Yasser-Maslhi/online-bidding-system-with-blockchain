const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  auctionId: {
    type: String,
    required: true,
  },
  itemName: {
    type: String, // Add item name as a string
    required: true, // Make it required
  },
});

module.exports = mongoose.model('Bid', bidSchema);
