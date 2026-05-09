import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaGraduationCap,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "../styles/footer.css";

function Footer() {

  return (
    <footer className="footer">

      <div className="container footer-grid">

        {/* ===================================== */}
        {/* COLUMN 1 */}
        {/* ===================================== */}
        <div className="footer-col">

          <h3 className="footer-logo">
            Dwarka Pratishthan
          </h3>

          <p className="footer-desc">
            Empowering students through
            quality education, discipline,
            innovation, and holistic growth
            across all our institutions.
          </p>

          {/* SOCIALS */}
          <div className="footer-socials">

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* ===================================== */}
        {/* COLUMN 2 */}
        {/* ===================================== */}
        <div className="footer-col">

          <h4>
            Our Institutions
          </h4>

          <ul>

            <li>
              <Link to="/little-birds-school">

                <FaGraduationCap />

                Little Birds Pre-Primary &
                Primary School

              </Link>
            </li>

            <li>
              <Link to="/gurukul">

                <FaGraduationCap />

                Dwarka Pratishthan
                International Gurukul

              </Link>
            </li>

            <li>
              <Link to="/junior-college">

                <FaGraduationCap />

                Dwarka Pratishthan
                Junior College

              </Link>
            </li>

            <li>
              <Link to="/defence-academy">

                <FaGraduationCap />

                Shri Chhatrapati Shivaji
                Maharaj Defence Academy

              </Link>
            </li>

          </ul>

        </div>

        {/* ===================================== */}
        {/* COLUMN 3 */}
        {/* ===================================== */}
        <div className="footer-col">

          <h4>
            Quick Links
          </h4>

          <ul>

            <li>
              <Link to="/about">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/academics">
                Academics
              </Link>
            </li>

            <li>
              <Link to="/admissions">
                Admissions
              </Link>
            </li>

            <li>
              <Link to="/gallery">
                Gallery
              </Link>
            </li>

            <li>
              <Link to="/contact">
                Contact Us
              </Link>
            </li>

          </ul>

        </div>

        {/* ===================================== */}
        {/* COLUMN 4 */}
        {/* ===================================== */}
        <div className="footer-col">

          <h4>
            Contact Information
          </h4>

          <p>

            <FaMapMarkerAlt />

            <a
              href="https://www.google.com/maps/place/Dwarka+Pratishtan,Kada/@18.8975115,75.0822684,21z"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kada, Maharashtra
            </a>

          </p>

          <p>

            <FaPhoneAlt />

            +91 98765 43210

          </p>

          <p>

            <FaEnvelope />

            <a href="mailto:dwarkapratishthan02@gmail.com">
              dwarkapratishthan02@gmail.com
            </a>

          </p>

          <p>

            <FaClock />

            Mon - Sat : 9 AM - 5 PM

          </p>

        </div>

      </div>

      {/* ===================================== */}
      {/* BOTTOM */}
      {/* ===================================== */}
      <div className="footer-bottom">

        <p>
          © 2026 Dwarka Pratishthan •
          All Rights Reserved
        </p>

      </div>

    </footer>
  );
}

export default Footer;