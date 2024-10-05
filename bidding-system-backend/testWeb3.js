// Import Web3
const {Web3} = require('web3');

// Initialize web3 by creating a new instance
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

async function test() {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts:', accounts);
    } catch (error) {
        console.error('Error:', error);
    }
}

test();
