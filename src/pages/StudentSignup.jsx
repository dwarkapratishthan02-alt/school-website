import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import "../styles/auth.css";

function StudentSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    class: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      // 🔥 1. Create auth user
      const { error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) throw error;

      // 🔥 2. Insert into students table (WITH STATUS = PENDING)
      const { error: insertError } = await supabase
        .from("students")
        .insert([
          {
            name: formData.name.trim(),
            roll_no: formData.roll.trim(),
            class: formData.class,
            email: formData.email.trim(),
            status: "pending", // ✅ IMPORTANT
          },
        ]);

      if (insertError) throw insertError;

      // ✅ Success message
      alert("Signup successful! Your account is pending admin approval.");

      navigate("/student/login");

    } catch (err) {
      console.error("Signup Error:", err);
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Student Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="roll"
          placeholder="Roll Number"
          value={formData.roll}
          onChange={handleChange}
          required
        />

        {/* 🔥 CLASS FIELD */}
        <select
          name="class"
          value={formData.class}
          onChange={handleChange}
          required
        >
          <option value="">Select Class</option>
          {[...Array(10)].map((_, i) => {
            const val = String(i + 1).padStart(2, "0");
            return (
              <option key={val} value={val}>
                Class {val}
              </option>
            );
          })}
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/student/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default StudentSignup;