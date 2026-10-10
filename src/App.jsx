
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";

function Home({ products, loading, error, addToCart }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <>
      <Hero />

      <main style={{
        maxWidth: "1320px",
        margin: "0 auto",
        padding: "0 24px 30px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "18px",
          flexWrap: "wrap",
          marginBottom: "25px"
        }}>
          <div>
            <p style={{
              color: "#a56b40",
              fontSize: "11px",
              letterSpacing: "2px",
              fontWeight: "700",
              marginBottom: "8px"
            }}>
              DISCOVER SOMETHING NEW
            </p>

            <h2 style={{
              fontSize: "clamp(24px, 3vw, 31px)",
              margin: 0
            }}>
              Find Your Favorites
            </h2>
          </div>

          <SearchBar search={search} setSearch={setSearch} />
        </div>

        {!loading && !error && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        )}

        <div id="products" style={{ scrollMarginTop: "100px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px"
          }}>
            <h2 style={{ margin: 0, fontSize: "22px" }}>
              {selectedCategory === "all"
                ? "Featured Products"
                : selectedCategory.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())}
            </h2>

            {!loading && !error && (
              <span style={{ color: "#777", fontSize: "13px" }}>
                {filteredProducts.length} products
              </span>
            )}
          </div>

          {loading ? (
            <div style={{
              background: "#ffffff",
              padding: "60px 20px",
              borderRadius: "15px",
              textAlign: "center"
            }}>
              <h3>Loading your collection...</h3>
              <p style={{ color: "#777" }}>Please wait a moment.</p>
            </div>
          ) : error ? (
            <div style={{
              background: "#ffffff",
              padding: "35px 20px",
              borderRadius: "15px",
              textAlign: "center"
            }}>
              <h3>We couldn't load the products</h3>
              <p style={{ color: "#777" }}>{error}</p>
              <p style={{ fontSize: "13px" }}>
                Check your internet connection and refresh the page.
              </p>
            </div>
          ) : (
            <ProductList
              products={filteredProducts}
              onAddToCart={addToCart}
            />
          )}
        </div>
      </main>
    </>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("nova-cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      return Array.isArray(parsedCart)
        ? parsedCart.filter(
            (item) =>
              item &&
              Number.isFinite(Number(item.id)) &&
              Number.isFinite(Number(item.price)) &&
              Number.isFinite(Number(item.quantity)) &&
              Number(item.quantity) > 0
          ).map((item) => ({
            ...item,
            quantity: Math.floor(Number(item.quantity))
          }))
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let active = true;

    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        if (active) setProducts(response.data);
      })
      .catch(() => {
        if (active) {
          setError("Please check your internet connection and try again.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("nova-cart", JSON.stringify(cartItems));
    } catch {
      // The cart still works for the current session if storage is unavailable.
    }
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousItems, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(productId, change) {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#f8f7f4"
    }}>
      <Navbar cartCount={cartCount} />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                loading={loading}
                error={error}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Home
                products={products}
                loading={loading}
                error={error}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/product/:id"
            element={<ProductDetails addToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                clearCart={clearCart}
              />
            }
          />

          <Route
            path="*"
            element={
              <div style={{
                padding: "80px 20px",
                textAlign: "center"
              }}>
                <h1>404 — Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" style={{ color: "#a56b40" }}>
                  Return to Home
                </a>
              </div>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
