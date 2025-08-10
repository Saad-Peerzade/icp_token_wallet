import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "orange" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/profile" style={{ marginRight: "10px" }}>Profile</Link>
      <Link to="/deposit" style={{ marginRight: "10px" }}>Deposit</Link>
      <Link to="/withdraw" style={{ marginRight: "10px" }}>Withdraw </Link>
      <Link to="/transactions">Transactions</Link>
    </nav>
  );
}

export default Navbar;
