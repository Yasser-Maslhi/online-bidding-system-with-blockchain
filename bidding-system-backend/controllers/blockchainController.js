const blockchainService = require('../services/blockchainService');

exports.getContractDetails = async (req, res) => {
    const contractDetails = await blockchainService.getContractDetails();
    res.status(200).json(contractDetails);
};
