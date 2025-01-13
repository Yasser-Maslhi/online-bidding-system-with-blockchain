import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [initializeData, setInitializeData] = useState({ itemName: '', itemId: '', auctionEndTime: '' });
    const [highestBid, setHighestBid] = useState(null);
    const [bidData, setBidData] = useState({ bidAmount: '' }); // Only require `bidAmount` as others are auto-filled
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId'); // Automatically retrieve `userId`

    useEffect(() => {
        if (!userId) {
            setError('User ID not found. Please log in.');
        }
    }, [userId]);

    // Initialize Auction
    const handleInitializeAuction = async () => {
        try {
            if (!initializeData.itemName || !initializeData.itemId || !initializeData.auctionEndTime) {
                setError('All fields (Item Name, Item ID, Auction End Time) are required.');
                return;
            }
            setLoading(true);
            const response = await axios.post('http://localhost:3000/bids/initialize', {
                auctionEndTime: new Date(initializeData.auctionEndTime).getTime(),
                itemId: initializeData.itemId,
                itemName: initializeData.itemName,
            });
            console.log("handleInitializeAuction ",response)
            setSuccessMessage(response.data.message);
            setError('');
            setInitializeData({ itemName: '', itemId: '', auctionEndTime: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Error initializing auction.');
        } finally {
            setLoading(false);
        }
    };

    // Search for Highest Bid
    const fetchHighestBid = async () => {
        try {
            if (!initializeData.SitemName) {
                setError('Please provide an Item Name to search.');
                return;
            }
            setLoading(true);
            const response = await axios.get('http://localhost:3000/bids/highestBid', {
                params: { itemName: initializeData.SitemName },
            });
            setHighestBid(response.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'No bids found for this item.');
        } finally {
            setLoading(false);
        }
    };

    // Place a Bid
    const handlePlaceBid = async () => {
        try {
            if (!highestBid || !highestBid.auctionId) {
                setError('Please search for the highest bid to get the auction details.');
                return;
            }
            if (!bidData.bidAmount) {
                setError('Bid Amount is required.');
                return;
            }
            setLoading(true);
            const response = await axios.post('http://localhost:3000/bids/placeBid', {
                itemName: highestBid.itemName,
                itemId: highestBid.itemId,
                bidAmount: bidData.bidAmount,
                userId,
                auctionId: highestBid.auctionId, // Auto-fill `auctionId` from highest bid
            });
            setSuccessMessage(response.data.message);
            setError('');
            setBidData({ bidAmount: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Error placing bid.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <h1>Welcome to the Auction System</h1>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {/* Initialize Auction Section */}
            <div className="initialize-auction-section">
                <h2>Initialize Auction</h2>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={initializeData.itemName}
                    onChange={(e) => setInitializeData({ ...initializeData, itemName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Item ID"
                    value={initializeData.itemId}
                    onChange={(e) => setInitializeData({ ...initializeData, itemId: e.target.value })}
                />
                <input
                    type="datetime-local"
                    placeholder="Auction End Time"
                    value={initializeData.auctionEndTime}
                    onChange={(e) => setInitializeData({ ...initializeData, auctionEndTime: e.target.value })}
                />
                <button onClick={handleInitializeAuction} disabled={loading}>
                    {loading ? 'Initializing...' : 'Initialize Auction'}
                </button>
            </div>

            {/* Search for Highest Bid Section */}
            <div className="highest-bid-section">
                <h2>Search for Highest Bid</h2>
                <input
                    type="text"
                    placeholder="Enter Item Name"
                    value={initializeData.SitemName}
                    onChange={(e) => setInitializeData({ ...initializeData, SitemName: e.target.value })}
                />
                <button onClick={fetchHighestBid} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
                {highestBid && (
                    <div>
                        <p><strong>Item Name:</strong> {highestBid.itemName}</p>
                        <p><strong>Highest Bid Amount:</strong> {highestBid.bidAmount}</p>
                        <p><strong>Auction ID:</strong> {highestBid.auctionId}</p>
                    </div>
                )}
            </div>

            {/* Place a Bid Section */}
            <div className="place-bid-section">
                <h2>Place a Bid</h2>
                <p><strong>Item Name:</strong> {highestBid?.itemName || 'Search for a bid first'}</p>
                <p><strong>Item ID:</strong> {highestBid?.itemId || 'Search for a bid first'}</p>
                <p><strong>Auction ID:</strong> {highestBid?.auctionId || 'Search for a bid first'}</p>
                <input
                    type="number"
                    placeholder="Enter Bid Amount"
                    value={bidData.bidAmount}
                    onChange={(e) => setBidData({ bidAmount: e.target.value })}
                />
                <button onClick={handlePlaceBid} disabled={loading}>
                    {loading ? 'Placing...' : 'Place Bid'}
                </button>
            </div>
        </div>
    );
};

export default Profile;
