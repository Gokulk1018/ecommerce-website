import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Checkout({ cart, removeFromCart, setCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !address) {
      alert("Please fill in all details!");
      return;
    }

    // Save order to order history in localStorage
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const newOrder = {
      id: Date.now(),
      name,
      email,
      address,
      total,
      date: new Date().toLocaleString(),
      items: cart,
    };
    localStorage.setItem("orderHistory", JSON.stringify([newOrder, ...orderHistory]));

    // Clear cart
    setCart([]);
    navigate("/payment-success");
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        <ul className="checkout-list">
          {cart.map((item) => (
            <li key={item.id} className="checkout-item">
              <div className="checkout-info">
                <span>{item.name}</span>
                <span>
                  ₹{item.price} × {item.quantity}
                </span>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                ✖ Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2 className="checkout-total">Total: ₹{total}</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </label>
        <label>
          Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </label>
        <button
          type="submit"
          className="place-order-btn"
          disabled={cart.length === 0}
        >
          {cart.length === 0 ? "Add items to place order" : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
