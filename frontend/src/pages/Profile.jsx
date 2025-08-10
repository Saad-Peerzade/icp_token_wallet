import React from "react";

export default function Profile({ user }) {
  return (
    <div className="simple-card p-6">
      <h2 className="text-2xl font-bold text-black mb-6">Profile</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center border-2 border-black">
            <span className="text-2xl text-white font-bold">{user.email[0].toUpperCase()}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-black">{user.email}</h3>
            <p className="text-gray-600">Wallet Owner</p>
          </div>
        </div>

        <div className="border-t-2 border-black pt-6">
          <h4 className="text-lg font-bold text-black mb-4">Wallet Address</h4>
          <div className="bg-gray-100 border-2 border-black rounded p-4">
            <p className="text-sm font-mono text-black break-all">{user.walletAddress}</p>
            <p className="text-xs text-red-600 mt-2 font-bold">⚠️ This address cannot be changed!</p>
          </div>
        </div>

        <div className="border-t-2 border-black pt-6">
          <h4 className="text-lg font-bold text-black mb-4">Account Info</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-black mb-1">Account Type</label>
              <p className="text-black">Standard User</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1">Member Since</label>
              <p className="text-black">January 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
