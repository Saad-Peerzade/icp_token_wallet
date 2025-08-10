import React from "react";

export default function Home({ walletData, onMint, setCurrentTab }) {
  return (
    <div className="space-y-6">
      <div className="simple-card p-6">
        <h2 className="text-2xl font-bold mb-4 text-black">Wallet Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 border-2 border-black rounded p-4">
            <h3 className="text-sm font-bold text-black">Your Balance</h3>
            <p className="text-2xl font-bold text-black">
              {walletData.balance.toLocaleString()} {walletData.tokenSymbol}
            </p>
          </div>
          <div className="bg-gray-100 border-2 border-black rounded p-4">
            <h3 className="text-sm font-bold text-black">Token Name</h3>
            <p className="text-xl font-bold text-black">{walletData.tokenName}</p>
          </div>
          <div className="bg-gray-100 border-2 border-black rounded p-4">
            <h3 className="text-sm font-bold text-black">Total Supply</h3>
            <p className="text-xl font-bold text-black">
              {walletData.totalSupply.toLocaleString()} {walletData.tokenSymbol}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="simple-card p-6">
          <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                onMint(100); // Mint 100 tokens
                alert("Minting 100 tokens...");
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 px-4 rounded border-2 border-black"
            >
              Mint Tokens
            </button>
            <button
              onClick={() => setCurrentTab("withdraw")}
              className="w-full bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 px-4 rounded border-2 border-black"
            >
              Send Tokens
            </button>
          </div>
        </div>

        <div className="simple-card p-6">
          <h3 className="text-lg font-bold text-black mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {walletData.transactions.slice(0, 5).map(tx => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2 border-b border-gray-200"
              >
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-3 ${
                      tx.tx_type === "received" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span className="text-sm text-black">
                    {tx.tx_type === "received" ? "Received" : "Sent"} {tx.amount} {walletData.tokenSymbol}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{tx.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
