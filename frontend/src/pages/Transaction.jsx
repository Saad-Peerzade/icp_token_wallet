import React from "react";

export default function Transactions({ transactions }) {
  return (
    <div className="simple-card p-6">
      <h2 className="text-2xl font-bold text-black mb-6">Transaction History</h2>
      <div className="space-y-4">
        {transactions.map(tx => (
          <div key={tx.id} className="border-2 border-black rounded p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-black ${
                  tx.tx_type === 'received' ? 'bg-green-200' : 'bg-red-200'
                }`}>
                  <span className={`text-lg font-bold ${tx.tx_type === 'received' ? 'text-green-800' : 'text-red-800'}`}>
                    {tx.tx_type === 'received' ? '↓' : '↑'}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-black">
                    {tx.tx_type === 'received' ? 'Received' : 'Sent'} {tx.amount} MSA
                  </p>
                  <p className="text-sm text-gray-600">
                    {tx.tx_type === 'received' ? `From: ${tx.from ?? 'Unknown'}` : `To: ${tx.to ?? 'Unknown'}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{tx.date}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-bold rounded border-2 ${
                  tx.status === 'completed' ? 'bg-green-100 text-green-800 border-green-500' : 'bg-yellow-100 text-yellow-800 border-yellow-500'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
