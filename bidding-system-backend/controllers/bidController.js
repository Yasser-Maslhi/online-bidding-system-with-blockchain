const Bid = require('../models/bid');
const blockchainService = require('../services/blockchainService');

exports.placeBid = async (req, res) => {
    const { bidAmount, userId } = req.body;
    
    // Save bid to database
    const newBid = new Bid({ userId, bidAmount });
    await newBid.save();

    // Interact with blockchain smart contract
    const result = await blockchainService.placeBid(userId, bidAmount);

    res.status(201).json({
        message: 'Bid placed successfully',
        blockchainTx: result
    });
};

exports.getHighestBid = async (req, res) => {
    const highestBid = await Bid.findOne().sort({ bidAmount: -1 }).limit(1);
    res.status(200).json(highestBid);
};
