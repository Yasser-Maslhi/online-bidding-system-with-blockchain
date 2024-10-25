const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bidRoutes = require('./routes/bidRoutes');
const { run } = require('./dbConnect');
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");

const app = express();
app.use(bodyParser.json());
run().catch(console.dir);

// Connect to Solana Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Program and Auction Account Information
const programId = new PublicKey("9AB5pphDdLpJuj45rieYnYnysi5n45vP7zo2mPH29qGi");
const auctionAccountPubkey = new PublicKey("EfpXVeGp9Us7f7H2b8SPUBNMroLN5wniHYvAMrk9BEoz"); // Replace with actual auction account public key

// Temporary wallet for testing (use a secure method for real deployments)
const owner = Keypair.generate();

// Initialize Auction Endpoint
app.post("/initialize", async (req, res) => {
  try {
    const { auctionEndTime, itemId } = req.body;

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: owner.publicKey,
        newAccountPubkey: auctionAccountPubkey,
        lamports: await connection.getMinimumBalanceForRentExemption(64),
        space: 64,
        programId,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [owner]);
    res.status(200).send({ message: 'Auction initialized successfully!', signature });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Place Bid Endpoint
app.post("/bids/place", async (req, res) => {
  try {
    const { amount } = req.body;
    const bidder = Keypair.generate(); // Use an actual bidder's keypair in production

    const transaction = new Transaction();
    // Add instructions to call the program's `bid` method (you need to construct this instruction)

    const signature = await connection.sendTransaction(transaction, [bidder]);
    await connection.confirmTransaction(signature, "confirmed");

    res.status(200).send({ message: "Bid placed successfully!", signature });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

app.use('/users', userRoutes);
app.use('/bids', bidRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
