module.exports = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/bidding-system',
    blockchain: {
      provider: process.env.BLOCKCHAIN_PROVIDER || 'http://localhost:8545',
      contractAddress: process.env.CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS',
    },
    email: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-email-password',
    }
  };
  