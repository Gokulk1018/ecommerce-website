import { useState, useEffect } from "react";
import products from "./products";
import "./App.css";

function App() {
  // 🛒 Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Gokul-kun’s Shop</div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</a>
          <a href="#">About</a>
        </div>
      </nav>

      {/* Featured Banner */}
      <section className="banner">
        <h1>Welcome to Gokul-kun’s E-Commerce</h1>
        <p>Your one-stop shop for amazing products ✨</p>
      </section>

      {/* Search and Category Filter */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔎 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <main className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>₹{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </main>

      {/* Cart */}
      {cart.length > 0 && (
        <section className="cart-section">
          <h2>Your Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={item.id}>
                <span>
                  {item.name} - ₹{item.price} × {item.quantity}
                </span>
                <div>
                  <button onClick={() => increaseQuantity(index)}>➕</button>
                  <button onClick={() => decreaseQuantity(index)}>➖</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>
            Total: ₹
            {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
          </h3>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Gokul-kun’s Shop. Built with ❤️ and React.
      </footer>
    </div>
  );
}

export default App;
