const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const contractABI = require('./contractABI.json');
const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/your-infura-project-id'));
const contractAddress = 'your_contract_address';
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(bodyParser.json());

// Record a bid on the blockchain
app.post('/record-bid', async (req, res) => {
    const { userId, itemId, amount } = req.body;
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.recordBid(userId, itemId, amount).send({ from: accounts[0] });
    res.json(result);
});

app.listen(3002, () => {
    console.log('Blockchain Service running on port 3002');
});
