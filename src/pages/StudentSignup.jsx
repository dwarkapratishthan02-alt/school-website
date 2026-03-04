import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  function handleSignup(e) {
    e.preventDefault();

    // TEMPORARY FRONTEND ONLY
    console.log("Student Registered:", formData);

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