import React, { useEffect, useState } from "react";

function Profile() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(history);
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Your Profile</h2>
      <p>This page will show user details and order history. 🛍️</p>

      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p>No past orders yet.</p>
      ) : (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "#fff",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h4>Order on {order.date}</h4>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
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
      )}
    </div>
  );
}

export default Profile;
