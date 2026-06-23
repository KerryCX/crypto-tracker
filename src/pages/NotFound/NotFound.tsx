import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ color: "var(--text-primary)", marginBottom: "8px" }}>404</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
        Page not found
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "none",
          color: "var(--accent-teal)",
          cursor: "pointer",
          fontSize: "14px",
          padding: 0,
        }}
      >
        ← Back to market
      </button>
    </main>
  );
};

export default NotFound;
