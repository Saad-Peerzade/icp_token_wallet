
# My Token Wallet

A simple fungible token wallet built on the Internet Computer (ICP) blockchain.  
Backend implemented in Rust as an IC canister. Frontend implemented with React.

---

## Features

- View token balance
- Transfer tokens to other wallet addresses
- Mint tokens (for testing)
- View transaction history
- User profile display with wallet address

---

## Project Structure

```

my\_token\_wallet/
├── src/
│   ├── my\_token\_wallet\_backend/       # Rust backend canister code
│   │   ├── src/
│   │   │   └── lib.rs                 # Rust backend logic
│   │   └── my\_token\_wallet\_backend.did # Candid interface file for backend
│   ├── declarations/                  # Auto-generated candid bindings for frontend
│   └── frontend/                      # React frontend code
│       ├── src/
│       │   ├── App.jsx                # Main React component
│       │   ├── pages/                 # React pages: Home, Profile, Deposit, Withdraw, Transactions
│       │   └── components/            # Navbar, other reusable components
├── dfx.json                          # DFINITY project config
├── Cargo.toml                        # Rust dependencies and config
└── README.md                        # This file

````

---

## Setup and Installation

1. **Install DFINITY SDK (dfx)**  
   Follow instructions at https://internetcomputer.org/docs/current/developer-docs/sdk-installation/

2. **Build and Deploy**

```bash
# Build Rust canister and frontend
dfx build

# Deploy to local replica
dfx deploy
````

3. **Run Frontend**

After deploy, open the frontend URL provided in the terminal (usually [http://127.0.0.1:4943/](http://127.0.0.1:4943/)).

---

## Usage

* **Check balance:** On the dashboard, view your token balance.
* **Mint tokens:** Mint tokens for testing via the "Mint Tokens" button.
* **Transfer tokens:** Send tokens to any wallet address.
* **View transactions:** See recent transactions in your history.
* **Profile:** View your wallet address and account info.

---

## Backend API (Candid Interface)

* `get_balance(): nat64` — Returns current token balance.
* `greet(name: text): text` — Returns greeting message.
* `transfer(to: text, amount: nat64): bool` — Transfers tokens to an address.
* `mint(amount: nat64): bool` — Mints new tokens.
* `get_transactions(): vec<Transaction>` — Returns transaction list.

`Transaction` type:

```candid
type Transaction = record {
  id: nat64;
  tx_type: text;
  amount: nat64;
  from: opt text;
  to: opt text;
  date: text;
  status: text;
};
```

---

## Notes

* This project is for learning and demonstration purposes only.
* No real cryptocurrency or blockchain funds are used.
* Backend logic can be extended for more robust token management.

---

## License

MIT License

---


---

```


```
