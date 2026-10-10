
import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div style={{
        background: "#ffffff",
        borderRadius: "15px",
        padding: "50px 20px",
        textAlign: "center",
        color: "#777777"
      }}>
        <div style={{ fontSize: "35px" }}>⌕</div>
        <h3>No products found</h3>
        <p>Try another search or select a different category.</p>
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
      gap: "20px"
    }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
