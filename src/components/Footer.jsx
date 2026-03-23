import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaYoutube
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* Column 1 */}
        <div className="footer-col">
          <h3 className="footer-logo">Dwarka Pratishthan</h3>
          <p className="footer-desc">
            A distinguished group of institutions committed to academic
            excellence and holistic development.
          </p>

          {/* ✅ FIXED SOCIAL LINKS */}
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4>Our Institutions</h4>
          <ul>
            <li><Link to="/little-birds-school">Little Birds School</Link></li>
            <li><Link to="/shivaji-junior-college">Shivaji Junior College</Link></li>
            <li><Link to="/defence-academy">Defence Academy</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h4>Contact</h4>

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
            <FaPhoneAlt /> Not available
          </p>

          <p>
            <FaEnvelope />
            <a href="mailto:dwarkapratishthan02@gmail.com">
              dwarkapratishthan02@gmail.com
            </a>
          </p>

          <p>
            <FaClock /> Mon - Fri: 9 AM - 3 PM
          </p>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Dwarka Pratishthan • All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;