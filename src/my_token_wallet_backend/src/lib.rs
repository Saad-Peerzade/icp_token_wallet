use ic_cdk_macros::*;
use ic_cdk::export::candid::{CandidType, Deserialize};
use std::cell::RefCell;

#[derive(CandidType, Deserialize, Clone)]
struct Transaction {
    id: u64,
    tx_type: String,   // "sent" or "received"
    amount: u64,
    from: Option<String>,
    to: Option<String>,
    date: String,
    status: String,    // "completed" or "pending"
}

#[derive(CandidType, Deserialize, Clone)]
struct Profile {
    email: String,
    wallet_address: String,
    member_since: String,
}

thread_local! {
    static BALANCE: RefCell<u64> = RefCell::new(125075); // 1250.75 with 2 decimals scaled by 100
    static TRANSACTIONS: RefCell<Vec<Transaction>> = RefCell::new(vec![
        Transaction {
            id: 1,
            tx_type: "received".to_string(),
            amount: 50000,
            from: Some("0xabc...def".to_string()),
            to: None,
            date: "2024-01-15".to_string(),
            status: "completed".to_string(),
        },
        Transaction {
            id: 2,
            tx_type: "sent".to_string(),
            amount: 25000,
            from: None,
            to: Some("0x123...789".to_string()),
            date: "2024-01-14".to_string(),
            status: "completed".to_string(),
        },
    ]);
    static PROFILE: RefCell<Profile> = RefCell::new(Profile {
        email: "demo@wallet.com".to_string(),
        wallet_address: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12".to_string(),
        member_since: "January 2024".to_string(),
    });
}

#[query]
fn get_balance() -> u64 {
    BALANCE.with(|b| *b.borrow())
}

#[query]
fn get_transactions() -> Vec<Transaction> {
    TRANSACTIONS.with(|t| t.borrow().clone())
}

#[query]
fn get_profile() -> Profile {
    PROFILE.with(|p| p.borrow().clone())
}

#[update]
fn transfer_tokens(to_address: String, amount: u64) -> Result<String, String> {
    BALANCE.with(|b| {
        let mut balance = b.borrow_mut();
        if *balance < amount {
            return Err("Insufficient balance".to_string());
        }

        *balance -= amount;

        TRANSACTIONS.with(|t| {
            let mut txs = t.borrow_mut();
            let id = txs.len() as u64 + 1;
            let date = "2024-01-20".to_string(); // Ideally use real time
            txs.insert(0, Transaction {
                id,
                tx_type: "sent".to_string(),
                amount,
                from: None,
                to: Some(to_address.clone()),
                date: date.clone(),
                status: "completed".to_string(),
            });
        });

        Ok(format!("Sent {} tokens to {}", amount, to_address))
    })
}

#[update]
fn mint_tokens(amount: u64) {
    BALANCE.with(|b| {
        let mut balance = b.borrow_mut();
        *balance += amount;

        TRANSACTIONS.with(|t| {
            let mut txs = t.borrow_mut();
            let id = txs.len() as u64 + 1;
            let date = "2024-01-20".to_string();
            txs.insert(0, Transaction {
                id,
                tx_type: "received".to_string(),
                amount,
                from: Some("Mint Contract".to_string()),
                to: None,
                date,
                status: "completed".to_string(),
            });
        });
    });
}
