import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="container nav-content">

        {/* Logo */}
        <div className="logo">
          <div className="logo-box">LOGO</div>
          <span>Dwarka Pratishthan</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/academics">Academics</Link></li>
          <li><Link to="/admissions">Admissions</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {/* Login Dropdown */}
          <li className="login-dropdown" ref={dropdownRef}>
            <button
              className="login-btn"
              onClick={() => setOpen(!open)}
            >
              Login ▾
            </button>

            {open && (
              <div className="dropdown-menu">
                <Link to="/admin/login" onClick={() => setOpen(false)}>
                  Admin Login
                </Link>

                <Link to="/student/login" onClick={() => setOpen(false)}>
                  Student Login
                </Link>
              </div>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;