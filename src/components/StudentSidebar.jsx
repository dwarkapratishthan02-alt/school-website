import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/studentSidebar.css";

import {
  FaTachometerAlt,
  FaBook,
  FaClipboardCheck,
  FaUserGraduate,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

import { HiDocumentReport } from "react-icons/hi";

function StudentSidebar() {

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  // 🔥 FIXED LOGOUT FUNCTION
  async function handleLogout() {

    if (loading) return;
    setLoading(true);

    try {
      await supabase.auth.signOut();

      // 🔥 Clear any cached session (important)
      localStorage.clear();

      // 🔥 Redirect to HOME (NOT login)
      navigate("/", { replace: true });

    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🔥 MOBILE TOPBAR */}
      <div className="student-topbar">
        <button onClick={() => setOpen(true)}>
          <FaBars />
        </button>
        <h2>Student Panel</h2>
      </div>

      {/* 🔥 OVERLAY */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}

      {/* 🔥 SIDEBAR */}
      <div className={`student-sidebar ${open ? "open" : ""}`}>

        <h2 className="logo">My School</h2>

        <nav>

          <Link
            to="/student/dashboard"
            className={isActive("/student/dashboard") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link
            to="/student/study-material"
            className={isActive("/student/study-material") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaBook /> Materials
          </Link>

          <Link
            to="/student/attendance"
            className={isActive("/student/attendance") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaClipboardCheck /> Attendance
          </Link>

          <Link
            to="/student/results"
            className={isActive("/student/results") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <HiDocumentReport /> Results
          </Link>

          <Link
            to="/student/notices"
            className={isActive("/student/notices") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaUserGraduate /> Notices
          </Link>

        </nav>

        {/* 🔥 LOGOUT */}
        <button
          className="logout-btn"
          onClick={handleLogout}
          disabled={loading}
        >
          <FaSignOutAlt />
          {loading ? "Logging out..." : "Logout"}
        </button>

      </div>
    </>
  );
}

export default StudentSidebar;