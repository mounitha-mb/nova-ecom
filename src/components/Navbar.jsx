
import { Link } from "react-router-dom";

function Navbar({ cartCount = 0 }) {
  const linkStyle = {
    textDecoration: "none",
    color: "#263243",
    fontSize: "14px",
    fontWeight: "600",
    padding: "10px",
    cursor: "pointer",
    display: "inline-block"
  };

  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #ece9e4",
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%"
      }}
    >
      <nav
        style={{
          maxWidth: "1320px",
          margin: "auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        <Link to="/" style={{
          ...linkStyle,
          fontSize: "25px",
          letterSpacing: "4px",
          fontWeight: "800",
          color: "#17212f",
          padding: 0
        }}>
          NOVA
          <span style={{
            fontSize: "13px",
            color: "#858585",
            fontWeight: "400",
            letterSpacing: "3px",
            marginLeft: "7px"
          }}>
            STORE
          </span>
        </Link>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>

          <Link to="/products" style={linkStyle}>
            Products
          </Link>

          <Link
            to="/cart"
            style={{
              ...linkStyle,
              background: "#17212f",
              color: "#ffffff",
              borderRadius: "25px",
              padding: "11px 18px"
            }}
          >
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
