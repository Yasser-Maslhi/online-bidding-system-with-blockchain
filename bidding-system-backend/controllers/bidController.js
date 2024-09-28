const Bid = require('../models/bid');
const blockchainService = require('../services/blockchainService');

exports.createBid = async (req, res) => {
  const { userId, amount } = req.body;

  const newBid = new Bid({ userId, amount });
  await newBid.save();

  // Interact with the blockchain to record the bid
  const tx = await blockchainService.recordBid(newBid);
  res.status(201).json({ message: 'Bid created and recorded on blockchain', tx });
};

exports.getBids = async (req, res) => {
  const bids = await Bid.find().populate('userId', 'username');
  res.status(200).json(bids);
};

exports.getHighestBid = async (req, res) => {
  const highestBid = await Bid.findOne().sort({ amount: -1 }).populate('userId', 'username');
  res.status(200).json(highestBid);
};

