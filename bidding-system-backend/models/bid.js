const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bidAmount: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bid', bidSchema);
