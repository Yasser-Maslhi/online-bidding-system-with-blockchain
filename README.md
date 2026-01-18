🏷️ Online Bidding System with Blockchain

An Online Bidding System powered by Blockchain technology to ensure secure, transparent, and tamper-proof bidding processes.
This project allows users to create auctions, place bids, and track winners while storing critical bidding actions on the blockchain for integrity and trust.

📌 Features

✅ User Registration & Login (JWT Authentication)
✅ Create Auctions / Items for Bidding
✅ Place Bids Securely
✅ Blockchain Smart Contract Integration
✅ Transparent Bid Tracking (No manipulation)
✅ Winner Selection & Auction Closing
✅ MongoDB Database for Off-Chain Storage
✅ RESTful APIs (Node.js + Express)

🛠️ Technologies Used
Backend

Node.js

Express.js

MongoDB

JWT Authentication

Blockchain

Solidity (Smart Contract)

Truffle

Web3.js

Ganache (Local Blockchain Testing)

Frontend ()

React.js ()

HTML / CSS / JS

⚙️ Installation & Setup
✅ 1) Clone the repository
git clone https://github.com/your-username/online-bidding-system-with-blockchain.git
cd online-bidding-system-with-blockchain

✅ 2) Install dependencies
cd backend
yarn install

npm install

⛓️ Blockchain Setup (Truffle + Ganache)
✅ 1) Install Truffle globally
npm install -g truffle

✅ 2) Run Ganache

Open Ganache GUI
OR run a local blockchain using CLI.

✅ 3) Compile the smart contract
truffle compile

✅ 4) Deploy the smart contract
truffle migrate --reset

🗄️ MongoDB Setup

Make sure MongoDB is running locally or use MongoDB Atlas.

Example in backend/config.js:

MONGO_URI = "mongodb://localhost:27017/bidding_blockchain";
JWT_SECRET = "your_secret_key";

▶️ Run the Backend Server
cd backend
yarn start

📜 License

This project is open-source and available under the MIT License.
👨‍💻 Authors

Yaser Y Mslhi
