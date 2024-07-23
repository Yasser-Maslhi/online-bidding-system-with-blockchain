import React, { useState } from 'react';
import Web3 from 'web3';

const PlaceBid = () => {
  const [auctionId, setAuctionId] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  const handleBid = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(YourContractABI, YourContractAddress);
    const accounts = await web3.eth.requestAccounts();

    contract.methods.placeBid(auctionId).send({ from: accounts[0], value: web3.utils.toWei(bidAmount, 'ether') })
      .then(result => {
        alert('Bid placed successfully!');
      })
      .catch(error => {
        console.error('Error placing bid:', error);
        alert('Failed to place bid.');
      });
  };

  return (
    <div>
      <h2>Place Bid</h2>
      <input type="text" value={auctionId} onChange={e => setAuctionId(e.target.value)} placeholder="Auction ID" />
      <input type="text" value={bidAmount} onChange={e => setBidAmount(e.target.value)} placeholder="Bid Amount (ETH)" />
      <button onClick={handleBid}>Place Bid</button>
    </div>
  );
};

export default PlaceBid;
