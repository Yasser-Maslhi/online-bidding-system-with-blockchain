// const Bid = require('../models/bid');
// const blockchainService = require('../services/blockchainService');

// // Initialize an auction
// exports.initializeAuction = async (req, res) => {
//     try {
//         console.log('Initializing an auction...');
//         const { auctionEndTime, itemId } = req.body;
//         const auction = await blockchainService.initializeAuction(auctionEndTime, itemId);
//         res.status(201).json({ message: 'Auction initialized successfully', auctionId: auction.publicKey.toString() });
//     } catch (error) {
//         console.error('Error initializing auction:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // Place a bid on an auction
// exports.placeBid = async (req, res) => {
//     try {
//         const { bidAmount, userId, auctionId } = req.body;
        
//         // Save bid to database
//         const newBid = new Bid({ userId, bidAmount, auctionId });
//         await newBid.save();

//         // Interact with blockchain smart contract
//         const result = await blockchainService.placeBid(auctionId, userId, bidAmount);

//         res.status(201).json({
//             message: 'Bid placed successfully',
//             blockchainTx: result
//         });
//     } catch (error) {
//         console.error('Error placing bid:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get the highest bid
// exports.getHighestBid = async (req, res) => {
//     try {
//         const highestBid = await Bid.findOne().sort({ bidAmount: -1 }).limit(1);
//         if (!highestBid) {
//             return res.status(404).json({ message: 'No bids found' });
//         }
//         res.status(200).json(highestBid);
//     } catch (error) {
//         console.error('Error fetching highest bid:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

const Bid = require('../models/bid');
const blockchainService = require('../services/blockchainService');

// Initialize an auction
exports.initializeAuction = async (req, res) => {
    try {
        console.log('Initializing an auction...');
        const { auctionEndTime, itemId, itemName } = req.body;

        if (!auctionEndTime || !itemId || !itemName) {
            return res.status(400).json({ message: 'All fields (auctionEndTime, itemId, itemName) are required' });
        }

        // Interact with blockchain smart contract
        const auction = await blockchainService.initializeAuction(auctionEndTime, itemId);
        const newBid = new Bid({ itemId,  itemName , auctionId: auction.publicKey.toString()});
        await newBid.save();
        res.status(201).json({
            message: 'Auction initialized successfully',
            auctionId: auction.publicKey.toString(),
            itemName,
        });
    } catch (error) {
        console.error('Error initializing auction:', error);
        res.status(500).json({ error: error.message });
    }
};



// Place a bid on an auction
// exports.placeBid = async (req, res) => {
//     try {
//         const { bidAmount, userId, auctionId, itemName } = req.body;

//         if (!bidAmount || !userId || !auctionId || !itemName) {
//             return res.status(400).json({ message: 'All fields (bidAmount, userId, auctionId, itemName) are required' });
//         }

//         // Save bid to database
//         const newBid = new Bid({ userId, bidAmount, auctionId, itemName });
//         await newBid.save();

//         // Interact with blockchain smart contract
//         const result = await blockchainService.placeBid(auctionId, userId, bidAmount);

//         res.status(201).json({
//             message: 'Bid placed successfully',
//             blockchainTx: result,
//             bid: newBid, // Return the new bid data
//         });
//     } catch (error) {
//         console.error('Error placing bid:', error);
//         res.status(500).json({ error: error.message });
//     }
// };
exports.placeBid = async (req, res) => {
    try {
        const { bidAmount, userId, auctionId, itemName,itemId } = req.body;

        // Validate required fields
        if (!bidAmount || !userId  || !itemName) {
            return res.status(400).json({ message: 'All fields (bidAmount, userId, auctionId, itemName) are required' });
        }

        // Validate bidAmount
        if (isNaN(bidAmount) || bidAmount <= 0) {
            return res.status(400).json({ message: 'Invalid bid amount. It must be a positive number.' });
        }

        // Find existing bid or create a new one
        const existingBid = await Bid.findOneAndUpdate(
            { itemId, itemName,auctionId }, 
            { bidAmount },
            { new: true, upsert: true }
        );

        // Interact with blockchain smart contract
        const result = await blockchainService.placeBid(auctionId, userId, bidAmount);

        // Return success response
        res.status(201).json({
            message: 'Bid placed successfully',
            blockchainTx: result,
            bid: existingBid,
        });
    } catch (error) {
        console.error('Error placing bid:', error);

        // Handle blockchain-related errors specifically if needed
        if (error.isBlockchainError) {
            return res.status(500).json({ message: 'Blockchain transaction failed', details: error.message });
        }

        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Get the highest bid
// Get the highest bid by itemId or itemName
exports.getHighestBid = async (req, res) => {
    try {
        const { itemId, itemName } = req.query;

        if (!itemId && !itemName) {
            return res.status(400).json({ message: 'Either Item ID or Item Name is required' });
        }

        let query = {};
        if (itemId) {
            query = { auctionId: itemId };
        } else if (itemName) {
            query = { itemName: itemName };
        }

        // Find the highest bid for the specified item
        const highestBid = await Bid.findOne(query).sort({ bidAmount: -1 }).limit(1);

        if (!highestBid) {
            return res.status(404).json({ message: 'No bids found for this item' });
        }

        res.status(200).json(highestBid);
    } catch (error) {
        console.error('Error fetching highest bid:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.checkAuction = async (req, res) => {
    try {
        const { itemId, itemName } = req.query;

        if (!itemId && !itemName) {
            return res.status(400).json({ message: 'Either Item ID or Item Name is required' });
        }

        const query = itemId ? { auctionId: itemId } : { itemName: itemName };
        const auctionExists = await Bid.findOne(query);

        if (!auctionExists) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        res.status(200).json({ message: 'Auction exists', auction: auctionExists });
    } catch (error) {
        console.error('Error checking auction:', error);
        res.status(500).json({ error: 'Error checking auction' });
    }
};
