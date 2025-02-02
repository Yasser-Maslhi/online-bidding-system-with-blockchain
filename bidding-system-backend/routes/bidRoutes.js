const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');

router.post('/initialize', bidController.initializeAuction);
router.post('/placeBid', bidController.placeBid);
router.get('/highestBid', bidController.getHighestBid);
router.get('/checkAuction', bidController.checkAuction);

module.exports = router;