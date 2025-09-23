import React from "react";

function Wishlist({ wishlist, toggleWishlist }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <p style={{ textAlign: "center" }}>No items in your wishlist yet.</p>
      ) : (
        <div className="products-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>₹{item.price}</p>
              <button onClick={() => toggleWishlist(item)}>
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
