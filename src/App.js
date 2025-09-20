import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import products from "./products";
import Checkout from "./Checkout";
import "./App.css";

function App() {
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

    // Cart bounce animation
    const cartLink = document.querySelector(".nav-links a:nth-child(2)");
    if (cartLink) {
      cartLink.classList.add("cart-bounce");
      setTimeout(() => cartLink.classList.remove("cart-bounce"), 600);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-brand">Gokul-kun’s Shop</div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/checkout">
              Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Link>
            <a href="#">About</a>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Banner */}
                <section className="banner">
                  <h1>Welcome to Gokul-kun’s E-Commerce</h1>
                  <p>Your one-stop shop for amazing products ✨</p>
                </section>

                {/* Filters */}
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
              </>
            }
          />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />

        {/* Footer */}
        <footer className="footer">
          © {new Date().getFullYear()} Gokul-kun’s Shop. Built with ❤️ and React.
        </footer>
      </div>
    </Router>
  );
}

export default App;
