
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: ""
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 5.99;
  const total = subtotal + shipping;

  const inputStyle = {
    width: "100%",
    padding: "13px",
    border: "1px solid #e4e1db",
    borderRadius: "8px",
    marginTop: "7px",
    outlineColor: "#b98558",
    background: "#fff"
  };

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cartItems.length === 0) return;

    setPlaced(true);
    clearCart();
  }

  if (placed) {
    return (
      <main style={{
        maxWidth: "650px",
        margin: "60px auto",
        padding: "35px 24px",
        background: "#ffffff",
        borderRadius: "16px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "55px" }}>✓</div>
        <h1>Thank you for your order!</h1>
        <p style={{ color: "#777", lineHeight: 1.8 }}>
          Your demo order has been placed successfully.
          No payment has been collected.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#17212f",
            color: "#fff",
            padding: "14px 25px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Back to Home
        </button>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main style={{
        maxWidth: "650px",
        margin: "60px auto",
        padding: "30px",
        textAlign: "center",
        background: "#fff",
        borderRadius: "16px"
      }}>
        <h2>Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          style={{
            background: "#17212f",
            color: "#fff",
            padding: "13px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Shop Now
        </button>
      </main>
    );
  }

  return (
    <main style={{
      maxWidth: "1100px",
      margin: "35px auto",
      padding: "24px"
    }}>
      <p style={{
        color: "#a56b40",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "2px"
      }}>
        ALMOST YOURS
      </p>

      <h1>Checkout</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        gap: "25px",
        alignItems: "start"
      }}>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "15px"
          }}
        >
          <h2>Delivery Details</h2>

          {[
            ["name", "Full Name", "text"],
            ["email", "Email Address", "email"],
            ["address", "Street Address", "text"],
            ["city", "City", "text"],
            ["postalCode", "Postal Code", "text"]
          ].map(([name, label, type]) => (
            <label
              key={name}
              style={{
                display: "block",
                marginTop: "17px",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              {label}
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
                autoComplete="on"
                style={inputStyle}
              />
            </label>
          ))}

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#17212f",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "15px",
              marginTop: "25px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Place Demo Order · ${total.toFixed(2)}
          </button>

          <p style={{ color: "#888", fontSize: "12px", lineHeight: 1.6 }}>
            This is a practice checkout. Do not enter sensitive payment information.
          </p>
        </form>

        <aside style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "15px"
        }}>
          <h2 style={{ marginTop: 0 }}>Your Order</h2>

          {cartItems.map((item) => (
            <div key={item.id} style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              padding: "13px 0",
              borderBottom: "1px solid #efede8",
              fontSize: "13px"
            }}>
              <span>{item.title} × {item.quantity}</span>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px"
          }}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px"
          }}>
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "22px",
            paddingTop: "18px",
            borderTop: "1px solid #e9e6e0",
            fontSize: "19px",
            fontWeight: "700"
          }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
