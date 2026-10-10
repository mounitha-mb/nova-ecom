
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  return (
    <article style={{
      background: "#ffffff",
      border: "1px solid #efede8",
      borderRadius: "15px",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      transition: "box-shadow 0.2s ease"
    }}>
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        style={{
          background: "#f7f6f3",
          borderRadius: "11px",
          height: "215px",
          padding: "17px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative"
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            mixBlendMode: "multiply"
          }}
        />

        <span style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "#f18b36",
          color: "#ffffff",
          borderRadius: "20px",
          padding: "5px 9px",
          fontSize: "10px",
          fontWeight: "700"
        }}>
          NEW FIND
        </span>
      </div>

      <p style={{
        color: "#858585",
        textTransform: "capitalize",
        fontSize: "11px",
        margin: "13px 0 5px"
      }}>
        {product.category}
      </p>

      <h3
        onClick={() => navigate(`/product/${product.id}`)}
        title={product.title}
        style={{
          fontSize: "14px",
          lineHeight: 1.5,
          height: "42px",
          overflow: "hidden",
          margin: "0 0 7px",
          color: "#17212f",
          cursor: "pointer"
        }}
      >
        {product.title}
      </h3>

      <p style={{
        fontSize: "12px",
        margin: "0 0 9px",
        color: "#5e6269"
      }}>
        <span style={{ color: "#f18b36" }}>★</span>{" "}
        {product.rating?.rate ?? "—"}
        <span style={{ color: "#999999" }}>
          {" "}({product.rating?.count ?? 0} reviews)
        </span>
      </p>

      <div style={{
        fontSize: "17px",
        fontWeight: "700",
        marginBottom: "12px",
        color: "#17212f"
      }}>
        ${Number(product.price).toFixed(2)}
      </div>

      <button
        onClick={() => onAddToCart(product)}
        style={{
          background: "#17212f",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          padding: "12px 8px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "600",
          marginTop: "auto"
        }}
      >
        🛒 Add to Cart
      </button>

      <button
        onClick={() => navigate(`/product/${product.id}`)}
        style={{
          marginTop: "7px",
          padding: "8px",
          border: "none",
          background: "transparent",
          color: "#656b73",
          cursor: "pointer",
          fontSize: "12px"
        }}
      >
        View Details →
      </button>
    </article>
  );
}

export default ProductCard;
