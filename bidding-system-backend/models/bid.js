const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  userId: {
    type: String,  
    required: true
  },
  bidAmount: {
    type: Number,
    required: true
  },
  auctionId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Bid', bidSchema);