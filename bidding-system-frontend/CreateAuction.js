import React, { useState } from 'react';
import Web3 from 'web3';

const CreateAuction = () => {
  const [itemName, setItemName] = useState('');
  const [duration, setDuration] = useState('');

  const handleCreate = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(YourContractABI, YourContractAddress);
    const accounts = await web3.eth.requestAccounts();
    
    contract.methods.createAuction(itemName, duration).send({ from: accounts[0] })
      .then(result => {
        alert('Auction created successfully!');
      })
      .catch(error => {
        console.error('Error creating auction:', error);
        alert('Failed to create auction.');
      });
  };

  return (
    <div>
      <h2>Create Auction</h2>
      <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Item Name" />
      <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration (in seconds)" />
      <button onClick={handleCreate}>Create Auction</button>
    </div>
  );
};

export default CreateAuction;
