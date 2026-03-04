import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* Column 1 */}
        <div className="footer-col">
          <h3>Dwarka Pratishthan</h3>
          <p>
            A distinguished group of institutions committed to academic
            excellence, discipline and holistic development.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4>Our Institutions</h4>
          <ul>
            <li>
              <Link to="/little-birds-school">Little Birds School</Link>
            </li>
            <li>
              <Link to="/shivaji-junior-college">
                Shri Chhatrapati Shivaji Maharaj Junior College
              </Link>
            </li>
            <li>
              <Link to="/defence-academy">
                Academy of Defence & Non-Defence Studies
              </Link>
            </li>
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
          <h4>Contact Us</h4>
          <p>
            <FaMapMarkerAlt className="footer-icon" />
            Pune, Maharashtra
          </p>
          <p>
            <FaPhoneAlt className="footer-icon" />
            <a href="tel:+919876543210">+91 98765 43210</a>
          </p>
          <p>
            <FaEnvelope className="footer-icon" />
            <a href="mailto:info@dwarkapratishthan.edu">
              info@dwarkapratishthan.edu
            </a>
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Dwarka Pratishthan. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;