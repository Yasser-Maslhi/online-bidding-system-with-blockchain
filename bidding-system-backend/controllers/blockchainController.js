const blockchainService = require('../services/blockchainService');

exports.getBlockchainStatus = async (req, res) => {
  const status = await blockchainService.getBlockchainInfo();
  res.status(200).json(status);
};

