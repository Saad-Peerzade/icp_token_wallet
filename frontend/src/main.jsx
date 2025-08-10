import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Home from "./Home";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Profile from "./Profile";
import Transactions from "./Transactions";

export default function Main({ user, walletData, setWalletData, onMint, onTransfer }) {
  const [currentTab, setCurrentTab] = useState("home");

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 min-h-screen">
      <div className="lg:w-60">
        <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>

      <div className="flex-1">
        {currentTab === "home" && <Home walletData={walletData} onMint={onMint} setCurrentTab={setCurrentTab} />}
        {currentTab === "deposit" && <Deposit onMint={onMint} />}
        {currentTab === "withdraw" && <Withdraw walletData={walletData} onTransfer={onTransfer} />}
        {currentTab === "profile" && <Profile user={user} />}
        {currentTab === "history" && <Transactions transactions={walletData.transactions} />}
      </div>
    </div>
  );
}
