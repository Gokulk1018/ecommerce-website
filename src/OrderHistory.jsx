import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders.reverse()); // Show latest first
  }, []);

  if (orders.length === 0) {
    return (
      <div className="checkout-container" style={{ textAlign: "center" }}>
        <h1 className="checkout-title">No Orders Found 🛒</h1>
        <p>You haven’t placed any orders yet.</p>
        <Link to="/" className="place-order-btn" style={{ marginTop: "20px" }}>
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">📜 Your Order History</h1>
      {orders.map((order, index) => (
        <div key={index} className="order-card">
          <h3>Order #{orders.length - index}</h3>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <h4>Total: ₹{order.total}</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} — ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
