import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/adminSidebar.css";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaNewspaper,
  FaImages,
  FaBook,
  FaClipboardCheck,
  FaBars,
  FaSignOutAlt,
  FaEnvelope // 🔥 NEW ICON
} from "react-icons/fa";

import { MdSlideshow } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";

function AdminSidebar() {

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // 🔥 LOGOUT FUNCTION
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <>
      {/* 🔥 MOBILE TOP BAR */}
      <div className="admin-topbar">
        <button className="menu-btn" onClick={() => setOpen(true)}>
          <FaBars />
        </button>
        <h2>Admin Panel</h2>
      </div>

      {/* 🔥 OVERLAY */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}

      {/* 🔥 SIDEBAR */}
      <div className={`admin-sidebar ${open ? "open" : ""}`}>

        <div className="sidebar-logo">
          <h2>School Admin</h2>
        </div>

        <nav className="sidebar-menu">

          <Link
            to="/admin/dashboard"
            className={isActive("/admin/dashboard") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/students"
            className={isActive("/admin/students") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaUserGraduate />
            <span>Students</span>
          </Link>

          <Link
            to="/admin/news"
            className={isActive("/admin/news") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaNewspaper />
            <span>Notices</span>
          </Link>

          <Link
            to="/admin/materials"
            className={isActive("/admin/materials") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaBook />
            <span>Study Materials</span>
          </Link>

          <Link
            to="/admin/attendance"
            className={isActive("/admin/attendance") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaClipboardCheck />
            <span>Attendance</span>
          </Link>

          <Link
            to="/admin/results"
            className={isActive("/admin/results") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <HiDocumentReport />
            <span>Results</span>
          </Link>

          <Link
            to="/admin/sliders"
            className={isActive("/admin/sliders") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <MdSlideshow />
            <span>Slides</span>
          </Link>

          <Link
            to="/admin/gallery"
            className={isActive("/admin/gallery") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaImages />
            <span>Gallery</span>
          </Link>

          {/* 🔥 NEW: INQUIRIES PAGE */}
          <Link
            to="/admin/messages"
            className={isActive("/admin/messages") ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <FaEnvelope />
            <span>Inquiries</span>
          </Link>

        </nav>

        {/* 🔥 LOGOUT */}
        <div className="sidebar-logout">
          <button onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </>
  );
}

export default AdminSidebar;