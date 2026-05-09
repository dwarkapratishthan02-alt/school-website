import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import {
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import "../styles/navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const dropdownRef = useRef();

  /* CLOSE DROPDOWN OUTSIDE */

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setDropdownOpen(false);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  return (

    <header className="navbar">

      <div className="navbar-container">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="navbar-logo"
        >

          <img
            src="/logo.jpg"
            alt="Dwarka Pratishthan"
            className="navbar-logo-img"
          />

          <div className="navbar-logo-text">

            <h2>
              Dwarka Pratishthan
            </h2>

            <p>
              Excellence In Education
            </p>

          </div>

        </Link>

        {/* ================= MOBILE BUTTON ================= */}

        <button
          className="mobile-menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}

        </button>

        {/* ================= NAVIGATION ================= */}

        <nav
          className={`navbar-links ${
            menuOpen ? "active" : ""
          }`}
        >

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/academics">
            Academics
          </Link>

          <Link to="/admissions">
            Admissions
          </Link>

          <Link to="/gallery">
            Gallery
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          {/* ================= LOGIN ================= */}

          <div
            className="login-dropdown"
            ref={dropdownRef}
          >

            <button
              className="login-btn"
              onClick={() =>
                setDropdownOpen(
                  !dropdownOpen
                )
              }
            >

              Login

              <FaChevronDown
                className={`dropdown-icon ${
                  dropdownOpen
                    ? "rotate"
                    : ""
                }`}
              />

            </button>

            {dropdownOpen && (

              <div className="dropdown-menu">

                <Link
                  to="/admin/login"
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Admin Login
                </Link>

                <Link
                  to="/student/login"
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Student Login
                </Link>

              </div>

            )}

          </div>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;