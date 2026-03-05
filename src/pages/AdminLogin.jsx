import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/auth.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");

    // Login user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (!data?.user) {
      setErrorMsg("Login failed. No user returned.");
      return;
    }

    // Check admin role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle(); // safer than .single()

    if (profileError) {
      setErrorMsg("Error checking admin role: " + profileError.message);
      return;
    }

    if (!profile || profile.role !== "admin") {
      setErrorMsg("You are not authorized as admin.");
      return;
    }

    navigate("/admin/dashboard");
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {errorMsg && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errorMsg}
          </div>
        )}

        <input
          type="email"
          placeholder="Admin Email"
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;