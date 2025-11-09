import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5001/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.user.role);
      setMessage("✅ Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setMessage("❌ Invalid credentials!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f5f9",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Equipment Portal Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px",
            width: "100%",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
        <p style={{ marginTop: "10px" }}>
  New user?{" "}
  <span
    style={{ color: "#007bff", cursor: "pointer" }}
    onClick={() => (window.location.href = "/register")}
  >
    Register here
  </span>
</p>

        <p style={{ marginTop: "15px" }}>{message}</p>
      </form>
    </div>
  );
}

