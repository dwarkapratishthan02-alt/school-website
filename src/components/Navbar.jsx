import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);        // login dropdown
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
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
          <img src="/logo.jpg" alt="Dwarka Pratishthan Logo" className="logo-img" />
          <span>Dwarka Pratishthan</span>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/academics" onClick={() => setMenuOpen(false)}>Academics</Link></li>
          <li><Link to="/admissions" onClick={() => setMenuOpen(false)}>Admissions</Link></li>
          <li><Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

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
                <Link to="/admin/login" onClick={() => {
                  setOpen(false);
                  setMenuOpen(false);
                }}>
                  Admin Login
                </Link>

                <Link to="/student/login" onClick={() => {
                  setOpen(false);
                  setMenuOpen(false);
                }}>
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