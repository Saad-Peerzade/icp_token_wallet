import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { my_token_wallet_backend } from "../../src/declarations/my_token_wallet_backend";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Transfer from "./pages/Transfer";
import Transactions from "./pages/Transactions";

function App() {
  const [user, setUser] = useState({ email: "demo@wallet.com", walletAddress: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12" });
  const [walletData, setWalletData] = useState({
    balance: 0,
    transactions: [],
    tokenName: "MoSa",
    tokenSymbol: "MSA",
    totalSupply: 1000000,
  });
  const [loading, setLoading] = useState(false);

  // Load wallet data on mount
  useEffect(() => {
    fetchWalletData();
  }, []);

  async function fetchWalletData() {
    try {
      setLoading(true);
      const balance = await my_token_wallet_backend.get_balance();
      const transactions = await my_token_wallet_backend.get_transactions();
      setWalletData(prev => ({
        ...prev,
        balance,
        transactions,
      }));
    } catch (e) {
      console.error("Failed to load wallet data:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleTransfer(toAddress, amount) {
    try {
      setLoading(true);
      const result = await my_token_wallet_backend.transfer_tokens(toAddress, BigInt(amount));
      alert(result);
      fetchWalletData();
    } catch (e) {
      alert("Transfer failed: " + e.message || e);
    } finally {
      setLoading(false);
    }
  }

  async function handleMint(amount) {
    try {
      setLoading(true);
      await my_token_wallet_backend.mint_tokens(BigInt(amount));
      alert("Minted " + amount + " tokens.");
      fetchWalletData();
    } catch (e) {
      alert("Minting failed: " + e.message || e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home walletData={walletData} onMint={handleMint} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/transfer" element={<Transfer walletData={walletData} onTransfer={handleTransfer} />} />
        <Route path="/transactions" element={<Transactions transactions={walletData.transactions} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
