
function SearchBar({ search, setSearch }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#ffffff",
      border: "1px solid #e8e5df",
      borderRadius: "30px",
      padding: "0 17px",
      width: "100%",
      maxWidth: "520px"
    }}>
      <span style={{ fontSize: "20px", color: "#858585" }}>⌕</span>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search products"
        style={{
          border: "none",
          outline: "none",
          padding: "14px 0",
          width: "100%",
          background: "transparent",
          color: "#17212f",
          fontSize: "14px"
        }}
      />
    </div>
  );
}

export default SearchBar;
