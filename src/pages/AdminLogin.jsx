import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/auth.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    console.log("Logging in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Login result:", data, error);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!data?.user) {
      setMessage("Login succeeded but no user returned.");
      return;
    }

    // Check role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    console.log("Profile result:", profile, profileError);

    if (profileError) {
      setMessage(profileError.message);
      return;
    }

    if (!profile) {
      setMessage("No profile found for this user.");
      return;
    }

    if (profile.role !== "admin") {
      setMessage("User is not an admin.");
      return;
    }

    setMessage("Login successful! Redirecting...");
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {message && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {message}
          </p>
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