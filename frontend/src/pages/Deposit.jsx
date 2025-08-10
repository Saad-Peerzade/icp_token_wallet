import React, { useState } from "react";

export default function Deposit({ onMint }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseInt(amount);
    if (!numAmount || numAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }
    onMint(numAmount);
    setAmount("");
  };

  return (
    <div className="simple-card p-6">
      <h2 className="text-2xl font-bold text-black mb-6">Deposit Tokens</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-black mb-2">Amount to Deposit</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border-2 border-black rounded text-black"
            min="1"
            placeholder="Enter amount"
            required
          />
        </div>

        <button type="submit" className="w-full pink-button text-lg py-3">
          Deposit
        </button>
      </form>
    </div>
  );
}
