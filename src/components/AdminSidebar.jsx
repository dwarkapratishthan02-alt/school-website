import { Link, useLocation } from "react-router-dom";
import "../styles/adminSidebar.css";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaNewspaper,
  FaImages,
  FaBook,
  FaClipboardCheck
} from "react-icons/fa";

import { MdSlideshow } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";

function AdminSidebar() {

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-sidebar">

      <div className="sidebar-logo">
        <h2>School Admin</h2>
      </div>

      <nav className="sidebar-menu">

        <Link
          to="/admin/dashboard"
          className={isActive("/admin/dashboard") ? "active" : ""}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/admin/students"
          className={isActive("/admin/students") ? "active" : ""}
        >
          <FaUserGraduate />
          <span>Students</span>
        </Link>

        <Link
          to="/admin/news"
          className={isActive("/admin/news") ? "active" : ""}
        >
          <FaNewspaper />
          <span>Notices</span>
        </Link>

        {/* NEW MODULES */}

        <Link
          to="/admin/materials"
          className={isActive("/admin/materials") ? "active" : ""}
        >
          <FaBook />
          <span>Study Materials</span>
        </Link>

        <Link
          to="/admin/attendance"
          className={isActive("/admin/attendance") ? "active" : ""}
        >
          <FaClipboardCheck />
          <span>Attendance</span>
        </Link>

        <Link
          to="/admin/results"
          className={isActive("/admin/results") ? "active" : ""}
        >
          <HiDocumentReport />
          <span>Results</span>
        </Link>

        <Link
          to="/admin/sliders"
          className={isActive("/admin/sliders") ? "active" : ""}
        >
          <MdSlideshow />
          <span>Slides</span>
        </Link>

        <Link
          to="/admin/gallery"
          className={isActive("/admin/gallery") ? "active" : ""}
        >
          <FaImages />
          <span>Gallery</span>
        </Link>

      </nav>

    </div>
  );
}

export default AdminSidebar;