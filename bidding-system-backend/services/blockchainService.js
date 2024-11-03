const { Keypair, PublicKey, SystemProgram } = require('@solana/web3.js');
const { BN, web3 } = require('@project-serum/anchor');
const idl = require('../../target/idl/bidding_system.json');
const { AnchorProvider, Program, Wallet } = require('@project-serum/anchor');
const fs = require('fs');
const path = require('path');
const { Connection } = require('@solana/web3.js');
require('dotenv').config();

// Load environment variables
const CLUSTER_URL = process.env.CLUSTER_URL || 'http://127.0.0.1:8899';
const WALLET_PATH = process.env.WALLET_PATH || path.resolve(require('os').homedir(), '.config', 'solana', 'id.json');
const PROGRAM_ID = process.env.PROGRAM_ID || 'CsyFSB4fUHaFmtwhWMBqoUrcXdiQHnwWLiRjsL1aKiYi';

// Load wallet from the filesystem
const loadWallet = () => {
    const walletData = JSON.parse(fs.readFileSync(WALLET_PATH, 'utf-8'));
    return Keypair.fromSecretKey(new Uint8Array(walletData));
};

// Initialize connection, provider, and program
const connection = new Connection(CLUSTER_URL, 'confirmed');
const wallet = new Wallet(loadWallet());
const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
const programId = new PublicKey(PROGRAM_ID);
const program = new Program(idl, programId, provider);

// Initialize an auction on the blockchain
exports.initializeAuction = async (auctionEndTime, itemId) => {
    const auction = Keypair.generate();
    await program.methods
        .initialize(new BN(auctionEndTime), new BN(itemId))
        .accounts({
            auction: auction.publicKey,
            owner: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        })
        .signers([auction, provider.wallet.payer])
        .rpc();
    return auction;
};

// Place a bid on the blockchain
exports.placeBid = async (auctionId, userId, bidAmount) => {
    const auction = new PublicKey(auctionId);
    await program.methods
        .bid(new BN(bidAmount))
        .accounts({
            auction,
            bidder: provider.wallet.publicKey,
        })
        .signers([provider.wallet.payer])
        .rpc();
    return `Bid placed for auction: ${auctionId}`;
};
