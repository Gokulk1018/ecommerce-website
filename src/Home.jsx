// src/Home.jsx
const products = [
  { id: 1, name: "Smartphone", price: 14999, img: "https://via.placeholder.com/150" },
  { id: 2, name: "Wireless Headphones", price: 1999, img: "https://via.placeholder.com/150" },
  { id: 3, name: "T-Shirt", price: 499, img: "https://via.placeholder.com/150" },
  { id: 4, name: "Novel Book", price: 299, img: "https://via.placeholder.com/150" },
];

function Home({ addToCart }) {
  return (
    <>
      <section className="hero-banner">
        <h1>Welcome to Gokul-kun’s E-Shop ✨</h1>
        <p>Explore amazing deals on top products 💫</p>
      </section>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
