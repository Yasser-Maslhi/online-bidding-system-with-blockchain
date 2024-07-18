const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', BidSchema);
