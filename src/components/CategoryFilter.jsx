
const categoryIcons = {
  "all": "✦",
  "men's clothing": "♧",
  "women's clothing": "♡",
  "electronics": "⌘",
  "jewelery": "◇"
};

function CategoryFilter({ categories, selectedCategory, onSelect }) {
  const allCategories = ["all", ...categories];

  return (
    <section style={{
      maxWidth: "1320px",
      margin: "0 auto 38px",
      padding: "0 24px"
    }}>
      <div style={{
        display: "flex",
        gap: "15px",
        overflowX: "auto",
        padding: "8px 2px 14px"
      }}>
        {allCategories.map((category) => {
          const active = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              style={{
                flex: "1 0 115px",
                maxWidth: "180px",
                minWidth: "105px",
                padding: "16px 10px",
                borderRadius: "14px",
                border: active ? "1px solid #17212f" : "1px solid #ece9e4",
                background: active ? "#17212f" : "#ffffff",
                color: active ? "#ffffff" : "#263243",
                cursor: "pointer",
                textTransform: "capitalize",
                boxShadow: active ? "0 6px 15px #17212f18" : "0 3px 12px #00000004"
              }}
            >
              <div style={{
                fontSize: "25px",
                marginBottom: "9px"
              }}>
                {categoryIcons[category.toLowerCase()] || "✧"}
              </div>

              <div style={{
                fontSize: "12px",
                fontWeight: "600",
                whiteSpace: "normal"
              }}>
                {category === "all"
                  ? "All Products"
                  : category.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryFilter;
