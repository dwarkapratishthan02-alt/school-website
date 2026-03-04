import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import "../styles/auth.css";

function StudentSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
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

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Insert student data in database
    const { error: dbError } = await supabase.from("students").insert([
      {
        id: data.user.id,
        name: formData.name,
        roll: formData.roll,
        email: formData.email,
      },
    ]);

    if (dbError) {
      alert(dbError.message);
      return;
    }

    alert("Student registered successfully!");

    navigate("/student/login");
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

        <button type="submit">Register</button>

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