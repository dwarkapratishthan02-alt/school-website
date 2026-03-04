import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/auth.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // TEMPORARY HARDCODED CHECK
    if (email === "admin@dwarka.com" && password === "admin123") {
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;