import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import "../styles/auth.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      // 🔥 1. Login with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      // 🔥 2. Fetch student from DB
      const { data: student, error: fetchError } = await supabase
        .from("students")
        .select("*")
        .eq("email", email.trim())
        .single();

      if (fetchError) throw fetchError;

      // 🚫 3. BLOCK if not approved
      if (student.status !== "approved") {
        alert("Your account is pending admin approval.");

        // 🔥 IMPORTANT: logout immediately
        await supabase.auth.signOut();

        return;
      }

      // ✅ 4. Allow login
      navigate("/student/dashboard");

    } catch (err) {
      console.error("Login Error:", err);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Student Login</h2>

        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

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