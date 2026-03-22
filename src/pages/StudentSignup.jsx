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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // 🔥 2. Insert into students table
      const { error: insertError } = await supabase
        .from("students")
        .insert([
          {
            name: formData.name,
            roll_no: formData.roll,
            class: formData.class,
            email: formData.email,
          },
        ]);

      if (insertError) throw insertError;

      alert("Signup successful! Please login.");

      navigate("/student/login");
    } catch (err) {
      console.error(err);
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

        {/* 🔥 NEW: CLASS FIELD */}
        <select
          name="class"
          value={formData.class}
          onChange={handleChange}
          required
        >
          <option value="">Select Class</option>
          <option value="01">Class 01</option>
          <option value="02">Class 02</option>
          <option value="03">Class 03</option>
          <option value="04">Class 04</option>
          <option value="05">Class 05</option>
          <option value="06">Class 06</option>
          <option value="07">Class 07</option>
          <option value="08">Class 08</option>
          <option value="09">Class 09</option>
          <option value="10">Class 10</option>
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