const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');

router.post('/placeBid', bidController.placeBid);
router.get('/highestBid', bidController.getHighestBid);

module.exports = router;
