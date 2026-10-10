
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  function openProducts() {
    navigate("/products");

    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }

  return (
    <section
      style={{
        maxWidth: "1320px",
        margin: "24px auto 30px",
        padding: "0 24px"
      }}
    >
      <div
        style={{
          minHeight: "330px",
          borderRadius: "18px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          background: "linear-gradient(90deg, #f4e5d5, #e5c5a6)"
        }}
      >
        <div
          style={{
            flex: "1 1 350px",
            padding: "45px clamp(24px, 5vw, 65px)"
          }}
        >
          <p
            style={{
              color: "#a56b40",
              letterSpacing: "3px",
              fontSize: "12px",
              fontWeight: "700"
            }}
          >
            THE NOVA COLLECTION
          </p>

          <h1
            style={{
              fontSize: "clamp(32px, 4.5vw, 53px)",
              lineHeight: 1.12,
              margin: "16px 0",
              color: "#17212f"
            }}
          >
            Find Your Style.
            <br />
            Own Your Story.
          </h1>

          <p
            style={{
              color: "#6b6b6b",
              lineHeight: 1.8,
              maxWidth: "390px",
              fontSize: "15px"
            }}
          >
            Discover everyday essentials, trending accessories
            and smart finds — all in one place.
          </p>

          <button
            type="button"
            onClick={openProducts}
            style={{
              marginTop: "15px",
              background: "#17212f",
              color: "#ffffff",
              border: "none",
              borderRadius: "30px",
              padding: "14px 25px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Shop Collection →
          </button>
        </div>

        <div
          style={{
            flex: "1 1 300px",
            minHeight: "300px",
            alignSelf: "stretch",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      </div>
    </section>
  );
}

export default Hero;
