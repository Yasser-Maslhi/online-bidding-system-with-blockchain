// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bidding {
    struct Bid {
        address bidder;
        uint amount;
    }

    address public owner;
    Bid[] public bids;

    constructor() {
        owner = msg.sender;
    }

    function placeBid() public payable {
        require(msg.value > 0, "Bid amount must be greater than 0");
        bids.push(Bid(msg.sender, msg.value));
    }

    function getHighestBid() public view returns (address, uint) {
        Bid memory highestBid = bids[0];
        for (uint i = 1; i < bids.length; i++) {
            if (bids[i].amount > highestBid.amount) {
                highestBid = bids[i];
            }
        }
        return (highestBid.bidder, highestBid.amount);
    }
}
