const Bid = require('../models/bid');
const blockchainService = require('../services/blockchainService');

// Initialize an auction
exports.initializeAuction = async (req, res) => {
    try {
        console.log('Initializing an auction...');
        const { auctionEndTime, itemId } = req.body;
        const auction = await blockchainService.initializeAuction(auctionEndTime, itemId);
        res.status(201).json({ message: 'Auction initialized successfully', auctionId: auction.publicKey.toString() });
    } catch (error) {
        console.error('Error initializing auction:', error);
        res.status(500).json({ error: error.message });
    }
};

// Place a bid on an auction
exports.placeBid = async (req, res) => {
    try {
        const { bidAmount, userId, auctionId } = req.body;
        
        // Save bid to database
        const newBid = new Bid({ userId, bidAmount, auctionId });
        await newBid.save();

        // Interact with blockchain smart contract
        const result = await blockchainService.placeBid(auctionId, userId, bidAmount);

        res.status(201).json({
            message: 'Bid placed successfully',
            blockchainTx: result
        });
    } catch (error) {
        console.error('Error placing bid:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get the highest bid
exports.getHighestBid = async (req, res) => {
    try {
        const highestBid = await Bid.findOne().sort({ bidAmount: -1 }).limit(1);
        if (!highestBid) {
            return res.status(404).json({ message: 'No bids found' });
        }
        res.status(200).json(highestBid);
    } catch (error) {
        console.error('Error fetching highest bid:', error);
        res.status(500).json({ error: error.message });
    }
};