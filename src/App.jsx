import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import products from "./products";
import Checkout from "./Checkout";
import FeaturedCarousel from "./FeaturedCarousel";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import About from "./About";
import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Router>
      <div className="app-container">
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
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>
<FeaturedCarousel />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="banner">
                  <h1>Welcome to Gokul-kun’s E-Commerce</h1>
                  <p>Your one-stop shop for amazing products ✨</p>
                </section>

                <div className="filters">
                  <input
                    type="text"
                    placeholder="🔎 Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <main className="products-grid">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        className="product-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>₹{product.price}</p>
                        <button onClick={() => addToCart(product)}>
                          Add to Cart
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <p>No products found.</p>
                  )}
                </main>
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                setCart={setCart}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <ToastContainer position="top-center" autoClose={3000} />

        <footer className="footer">
          © {new Date().getFullYear()} Gokul-kun’s Shop. Built with ❤️ and React.
        </footer>
      </div>
    </Router>
  );
}

export default App;
