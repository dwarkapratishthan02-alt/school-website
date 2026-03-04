import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function StudentLogin() {
  const navigate = useNavigate();
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // Temporary login
    if (roll === "student1" && password === "1234") {
      navigate("/student/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Student Login</h2>

        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {/* Signup Link */}
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/student/signup")}
          >
            Sign up
          </span>
        </p>

      </form>
    </div>
  );
}

export default StudentLogin;