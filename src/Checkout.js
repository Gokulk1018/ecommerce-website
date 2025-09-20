import React from "react";
import { toast } from "react-toastify";

function Checkout({ cart, setCart }) {
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

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    toast.success("🎉 Order placed successfully!", { theme: "colored" });
    setCart([]); // Clear cart after placing order
  };

  return (
    <section className="cart-section">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
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
          <h3>Total: ₹{totalPrice}</h3>
          <button className="checkout-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </section>
  );
}

export default Checkout;
