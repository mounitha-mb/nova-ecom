
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");

    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (active) setProduct(response.data);
      })
      .catch(() => {
        if (active) setError("Unable to load this product. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center", padding: "70px" }}>Loading product...</p>;
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: "center", padding: "70px 20px" }}>
        <p>{error || "Product not found."}</p>
        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    );
  }

  return (
    <main style={{
      maxWidth: "1100px",
      margin: "35px auto",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "18px"
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          marginBottom: "25px",
          color: "#555"
        }}
      >
        ← Back
      </button>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        gap: "35px",
        alignItems: "center"
      }}>
        <div style={{
          background: "#f7f6f3",
          borderRadius: "15px",
          padding: "35px",
          minHeight: "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "350px",
              objectFit: "contain",
              mixBlendMode: "multiply"
            }}
          />
        </div>

        <div>
          <p style={{
            color: "#a56b40",
            textTransform: "capitalize",
            fontWeight: "600"
          }}>
            {product.category}
          </p>

          <h1 style={{ fontSize: "clamp(25px, 4vw, 38px)", lineHeight: 1.25 }}>
            {product.title}
          </h1>

          <p style={{ color: "#e78b32" }}>
            ★ {product.rating?.rate ?? "—"}{" "}
            <span style={{ color: "#888" }}>
              ({product.rating?.count ?? 0} reviews)
            </span>
          </p>

          <h2 style={{ fontSize: "30px" }}>
            ${Number(product.price).toFixed(2)}
          </h2>

          <p style={{ color: "#676767", lineHeight: 1.9 }}>
            {product.description}
          </p>

          <button
            onClick={() => addToCart(product)}
            style={{
              background: "#17212f",
              color: "#fff",
              padding: "14px 22px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
              marginTop: "15px"
            }}
          >
            🛒 Add to Cart
          </button>

          <button
            onClick={() => navigate("/cart")}
            style={{
              background: "#f3e7da",
              color: "#17212f",
              padding: "14px 22px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "15px"
            }}
          >
            View Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
