const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', bidSchema);
