import { useState } from "react";
import products from "./products";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const headerStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
  };

  const buttonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s"
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <header style={headerStyle}>
        <h1 style={{ margin: 0 }}>Gokul-kun’s E-Commerce</h1>
        <p style={{ margin: "5px 0 0" }}>A clean and modern storefront</p>
        <h3 style={{ marginTop: "10px" }}>Cart Items: {cart.length}</h3>
      </header>

      {/* Products */}
      <main style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", padding: "30px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "15px",
              width: "220px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "6px" }} />
            <h2 style={{ fontSize: "18px", margin: "10px 0" }}>{product.name}</h2>
            <p style={{ color: "#388e3c", fontWeight: "bold", margin: "8px 0" }}>₹{product.price}</p>
            <button
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1565c0")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1976d2")}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>

      {/* Cart */}
      {cart.length > 0 && (
        <section
          style={{
            maxWidth: "500px",
            margin: "20px auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
        >
          <h2 style={{ textAlign: "center", color: "#1976d2" }}>Your Cart</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd"
                }}
              >
                {item.name} - ₹{item.price}
                <button
                  style={{ ...buttonStyle, backgroundColor: "#e53935" }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c62828")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e53935")}
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "15px",
          backgroundColor: "#1976d2",
          color: "white",
          marginTop: "20px",
          boxShadow: "0 -2px 6px rgba(0,0,0,0.1)"
        }}
      >
        © {new Date().getFullYear()} Gokul-kun’s Shop. Built with ❤️ and React.
      </footer>
    </div>
  );
}

export default App;
