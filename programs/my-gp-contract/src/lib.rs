use anchor_lang::prelude::*;

declare_id!("9H5gWALcNSpLDZV8moHk6sXWBvGZmm7zkaEH1h1bYByH");

#[program]
pub mod bidding_system {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, auction_end_time: i64, item_id: u64) -> Result<()> {
        let auction: &mut Account<'_, Auction> = &mut ctx.accounts.auction;
        auction.owner = *ctx.accounts.owner.key;
        auction.auction_end_time = auction_end_time;
        auction.item_id = item_id;
        auction.highest_bid = 0;
        auction.highest_bidder = Pubkey::default();
        auction.ended = false;
        auction.pending_returns = vec![];
        msg!("Initializing auction account...");
        msg!("Auction end time: {}", auction_end_time);
        Ok(())
    }

    pub fn bid(ctx: Context<Bid>, amount: u64) -> Result<()> {
        let auction = &mut ctx.accounts.auction;

        require!(amount > auction.highest_bid, ErrorCode::BidTooLow);

        // Extract previous highest bidder and highest bid values
        let previous_highest_bidder = auction.highest_bidder;
        let previous_highest_bid = auction.highest_bid;

        // Refund the previous highest bidder
        if previous_highest_bid > 0 {
            auction.pending_returns.push(PendingReturn {
                bidder: previous_highest_bidder,
                amount: previous_highest_bid,
            });
        }

        // Update the highest bidder and highest bid
        auction.highest_bidder = *ctx.accounts.bidder.key;
        auction.highest_bid = amount;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        let bidder = *ctx.accounts.bidder.key;

        if let Some(index) = auction
            .pending_returns
            .iter()
            .position(|r| r.bidder == bidder)
        {
            let pending_return = auction.pending_returns.remove(index);
            **ctx.accounts.bidder.try_borrow_mut_lamports()? += pending_return.amount;
        }

        Ok(())
    }

    pub fn end_auction(ctx: Context<EndAuction>) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        require!(
            Clock::get()?.unix_timestamp >= auction.auction_end_time,
            ErrorCode::AuctionNotYetEnded
        );
        require!(!auction.ended, ErrorCode::AuctionAlreadyEnded);

        auction.ended = true;
        **ctx.accounts.owner.try_borrow_mut_lamports()? += auction.highest_bid;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = owner, space = 512)]
    pub auction: Account<'info, Auction>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Bid<'info> {
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    #[account(mut)]
    pub bidder: Signer<'info>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    #[account(mut)]
    pub bidder: Signer<'info>,
}

#[derive(Accounts)]
pub struct EndAuction<'info> {
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    #[account(mut)]
    pub owner: Signer<'info>,
}

#[account]
pub struct Auction {
    pub owner: Pubkey,
    pub auction_end_time: i64,
    pub item_id: u64,
    pub highest_bidder: Pubkey,
    pub highest_bid: u64,
    pub ended: bool,
    pub pending_returns: Vec<PendingReturn>, // Replace HashMap with Vec
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct PendingReturn {
    pub bidder: Pubkey,
    pub amount: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("There already is a higher bid.")]
    BidTooLow,
    #[msg("Auction already ended.")]
    AuctionAlreadyEnded,
    #[msg("Auction not yet ended.")]
    AuctionNotYetEnded,
}
