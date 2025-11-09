import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 200);
  };

  return (
    <nav
      style={{
        background: "#222",
        padding: "12px 20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "25px" }}>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/equipment" style={{ color: "white", textDecoration: "none" }}>
          Equipment
        </Link>

        {role === "student" && (
          <Link to="/requests" style={{ color: "white", textDecoration: "none" }}>
            My Requests
          </Link>
        )}

        {(role === "staff" || role === "admin") && (
          <Link to="/manage-requests" style={{ color: "white", textDecoration: "none" }}>
            Manage Requests
          </Link>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "#e74c3c",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

