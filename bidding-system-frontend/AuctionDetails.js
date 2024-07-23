import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const AuctionDetails = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      const web3 = new Web3(Web3.givenProvider);
      const contract = new web3.eth.Contract(YourContractABI, YourContractAddress);
      const auctionCount = await contract.methods.nextAuction
