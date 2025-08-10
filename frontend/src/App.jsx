import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import backend canister
import { my_token_wallet_backend } from "../../src/declarations/my_token_wallet_backend";
import "./index.css";
// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transactions from "./pages/Transaction";

// Components
import Navbar from "./components/Navbar";

function App() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch balance from backend
  async function getBalance() {
    setError(null);
    try {
      setLoading(true);
      const result = await my_token_wallet_backend.get_balance();
      console.log("Balance fetched:", result);
      // Defensive: convert result to string safely
      setBalance(result?.toString?.() ?? String(result));
    } catch (err) {
      console.error("Failed to fetch balance:", err);
      setError(`Failed to fetch balance: ${err.message || err.toString()}`);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }

  // Fetch balance on first load
  useEffect(() => {
    getBalance();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-4">
              <Home />
              <div className="mt-6">
                <button
                  onClick={getBalance}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Fetching..." : "Check Balance"}
                </button>

                {error && (
                  <p className="mt-2 text-red-600 font-semibold">{error}</p>
                )}

                {balance !== null && !error && (
                  <p className="mt-2 text-lg">
                    💰 Your balance: <strong>{balance}</strong>
                  </p>
                )}
              </div>
            </div>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
