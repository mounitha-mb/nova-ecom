
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, updateQuantity, removeFromCart }) {
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length === 0 || subtotal >= 100 ? 0 : 5.99;
  const total = subtotal + shipping;

  const money = (value) => `$${value.toFixed(2)}`;

  return (
    <main style={{
      maxWidth: "1100px",
      margin: "35px auto",
      padding: "24px",
      minHeight: "55vh"
    }}>
      <p style={{ color: "#a56b40", fontWeight: "700", fontSize: "12px" }}>
        YOUR SELECTION
      </p>

      <h1 style={{ fontSize: "32px", marginTop: "5px" }}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{
          background: "#ffffff",
          borderRadius: "16px",
          textAlign: "center",
          padding: "60px 20px"
        }}>
          <div style={{ fontSize: "48px" }}>🛍️</div>
          <h2>Your cart is waiting for something special</h2>
          <p style={{ color: "#777" }}>Explore our collection and find your next favorite.</p>
          <button
            onClick={() => navigate("/products")}
            style={{
              background: "#17212f",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "13px 22px",
              cursor: "pointer"
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "25px",
          alignItems: "start"
        }}>
          <section style={{
            background: "#ffffff",
            borderRadius: "15px",
            padding: "18px"
          }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{
                display: "grid",
                gridTemplateColumns: "85px minmax(0, 1fr)",
                gap: "15px",
                padding: "15px 0",
                borderBottom: "1px solid #efede8"
              }}>
                <div style={{
                  background: "#f7f6f3",
                  borderRadius: "10px",
                  padding: "8px",
                  height: "95px"
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      mixBlendMode: "multiply"
                    }}
                  />
                </div>

                <div>
                  <h3 style={{
                    fontSize: "14px",
                    lineHeight: 1.5,
                    margin: "0 0 7px"
                  }}>
                    {item.title}
                  </h3>

                  <p style={{ fontWeight: "700", margin: "5px 0" }}>
                    {money(item.price)}
                  </p>

                  <div style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginTop: "10px"
                  }}>
                    <button
                      aria-label={`Decrease quantity of ${item.title}`}
                      onClick={() => updateQuantity(item.id, -1)}
                      style={quantityButton}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label={`Increase quantity of ${item.title}`}
                      onClick={() => updateQuantity(item.id, 1)}
                      style={quantityButton}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#c04d42",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => navigate("/products")}
              style={{
                marginTop: "20px",
                border: "none",
                background: "transparent",
                color: "#17212f",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              ← Continue Shopping
            </button>
          </section>

          <aside style={{
            background: "#ffffff",
            borderRadius: "15px",
            padding: "24px",
            position: "sticky",
            top: "100px"
          }}>
            <h2 style={{ fontSize: "21px", marginTop: 0 }}>Order Summary</h2>

            <div style={summaryRow}>
              <span>Subtotal</span><span>{money(subtotal)}</span>
            </div>

            <div style={summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : money(shipping)}</span>
            </div>

            <p style={{ color: "#777", fontSize: "12px", lineHeight: 1.6 }}>
              {subtotal >= 100
                ? "Your order qualifies for free shipping."
                : `Spend ${money(100 - subtotal)} more for free shipping.`}
            </p>

            <div style={{
              ...summaryRow,
              borderTop: "1px solid #e9e6e0",
              paddingTop: "18px",
              fontWeight: "700",
              fontSize: "18px"
            }}>
              <span>Total</span><span>{money(total)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                background: "#17212f",
                color: "#ffffff",
                padding: "15px",
                border: "none",
                borderRadius: "8px",
                marginTop: "18px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Proceed to Checkout →
            </button>

            <p style={{
              textAlign: "center",
              color: "#888",
              fontSize: "11px",
              marginBottom: 0
            }}>
              Demo store · No real payment is collected
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

const quantityButton = {
  width: "28px",
  height: "28px",
  border: "1px solid #e5e2dc",
  background: "#ffffff",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "17px"
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  margin: "17px 0",
  fontSize: "14px"
};

export default Cart;
