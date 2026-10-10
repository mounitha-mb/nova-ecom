
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{
      background: "#17212f",
      color: "#ffffff",
      marginTop: "45px"
    }}>
      <div style={{
        maxWidth: "1320px",
        margin: "auto",
        padding: "35px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        <div>
          <h2 style={{
            letterSpacing: "4px",
            margin: "0 0 8px",
            fontSize: "23px"
          }}>
            NOVA <span style={{
              fontWeight: "400",
              fontSize: "13px",
              color: "#c3c8d0"
            }}>STORE</span>
          </h2>
          <p style={{ color: "#c3c8d0", fontSize: "13px", margin: 0 }}>
            Better finds. Brighter days.
          </p>
        </div>

        <div style={{
          display: "flex",
          gap: "22px",
          flexWrap: "wrap"
        }}>
          <button onClick={() => navigate("/")} style={footerLink}>Home</button>
          <button onClick={() => navigate("/products")} style={footerLink}>Shop</button>
          <button onClick={() => navigate("/cart")} style={footerLink}>Cart</button>
        </div>

        <p style={{
          color: "#c3c8d0",
          fontSize: "12px",
          width: "100%",
          borderTop: "1px solid #35404f",
          paddingTop: "20px",
          marginBottom: 0
        }}>
          © {new Date().getFullYear()} NOVA STORE. Demo e-commerce project.
        </p>
      </div>
    </footer>
  );
}

const footerLink = {
  border: "none",
  background: "transparent",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: "13px"
};

export default Footer;
