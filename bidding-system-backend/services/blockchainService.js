const { Web3 } = require('web3');
const web3 = new Web3('http://localhost:8545'); // Local Ethereum node

const contractABI = [/* ABI JSON from Solidity contract compilation */];
const contractAddress = '0x7fBBCD50B3104CbbdB26676a9161A59719bdDDeC';

const contract = new web3.eth.Contract(contractABI, contractAddress);

exports.placeBid = async (userId, bidAmount) => {
    // Interact with the blockchain contract
    const accounts = await web3.eth.getAccounts();
    const receipt = await contract.methods.placeBid(userId).send({
        from: accounts[0],
        value: web3.utils.toWei(bidAmount.toString(), 'ether')
    });
    return receipt;
};

exports.getContractDetails = async () => {
    const details = await contract.methods.getHighestBid().call();
    return details;
};

