import React, { useState } from "react";

export default function Withdraw({ walletData, onTransfer }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseInt(amount);

    if (!recipient) {
      alert("Enter recipient wallet address");
      return;
    }
    if (!numAmount || numAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }
    if (numAmount > walletData.balance) {
      alert("Insufficient balance");
      return;
    }
    onTransfer(recipient, numAmount);
    setRecipient("");
    setAmount("");
  };

  return (
    <div className="simple-card p-6">
      <h2 className="text-2xl font-bold text-black mb-6">Withdraw Tokens</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-black mb-2">Recipient Wallet Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x1234567890abcdef..."
            className="w-full px-3 py-2 border-2 border-black rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2">Amount ({walletData.tokenSymbol})</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border-2 border-black rounded text-black"
            min="1"
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            Available: {walletData.balance.toLocaleString()} {walletData.tokenSymbol}
          </p>
        </div>

        <div className="bg-yellow-100 border-2 border-yellow-500 rounded p-4">
          <div className="flex">
            <span className="text-yellow-700 mr-2">⚠️</span>
            <div>
              <h4 className="text-sm font-bold text-yellow-800">Warning</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Check the address carefully. Transactions cannot be undone!
              </p>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full pink-button text-lg py-3">
          Send Tokens
        </button>
      </form>
    </div>
  );
}
