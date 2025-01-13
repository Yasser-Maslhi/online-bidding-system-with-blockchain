const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  userId: {
    type: String,
  
  },
  bidAmount: {
    type: Number,
    
  },
  auctionId: {
    type: String,
    
  },
  itemName: {
    type: String, // Add item name as a string
    required: true, // Make it required
  },
  itemId: {
    type: String, // Add item name as a string
    required: true, // Make it required
  },
});

module.exports = mongoose.model('Bid', bidSchema);
