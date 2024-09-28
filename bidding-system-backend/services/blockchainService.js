const Web3 = require('web3');

// Web3 initialization using an HTTP provider
const web3 = new Web3('http://localhost:8545'); // Replace with your blockchain provider (local or remote)

const contractABI = require('../path_to_contract_abi'); // Import your smart contract ABI
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address

exports.recordBid = async (bid) => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const tx = await contract.methods.placeBid(bid.amount).send({ from: 'YOUR_WALLET_ADDRESS', value: bid.amount });
  return tx;
};

exports.getBlockchainInfo = async () => {
  const latestBlock = await web3.eth.getBlock('latest');
  return latestBlock;
};
