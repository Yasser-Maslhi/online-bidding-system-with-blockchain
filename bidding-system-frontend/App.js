import React from 'react';
import CreateAuction from './CreateAuction';
import PlaceBid from './PlaceBid';
import AuctionDetails from './AuctionDetails';

function App() {
  return (
    <div>
      <h1>Bidding System Dashboard</h1>
      <CreateAuction />
      <PlaceBid />
      <AuctionDetails />
    </div>
  );
}

export default App;
