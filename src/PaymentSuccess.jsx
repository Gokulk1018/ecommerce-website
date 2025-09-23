import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";

function PaymentSuccess() {
  const location = useLocation();
  const { name, total } = location.state || { name: "Customer", total: 0 };

  return (
    <div className="checkout-container" style={{ textAlign: "center" }}>
      <h1 className="checkout-title">🎉 Payment Successful!</h1>
      <p>Thank you, {name}! Your order has been placed successfully. 🛍️</p>
      <h2 className="checkout-total">Total Paid: ₹{total}</h2>
      <p>We’ll send an email confirmation shortly with your order details.</p>
      <Link to="/" className="place-order-btn" style={{ marginTop: "20px", display: "inline-block" }}>
        Back to Shop
      </Link>
    </div>
  );
}

export default PaymentSuccess;
