import { FaGraduationCap, FaUserShield, FaBookOpen, FaTrophy } from "react-icons/fa";
import "../styles/excellence.css";

function Excellence() {
  return (
    <section className="excellence">
      <div className="container">

        <div className="section-header">
          <h2>Academic Excellence</h2>
          <p>
            At Dwarka Pratishthan, we focus on delivering quality education,
            discipline, and holistic development across all our institutions.
          </p>
        </div>

        <div className="excellence-grid">

          <div className="excellence-card">
            <FaGraduationCap className="icon" />
            <h3>Qualified Faculty</h3>
            <p>
              Experienced and dedicated educators committed to academic
              excellence and student growth.
            </p>
          </div>

          <div className="excellence-card">
            <FaBookOpen className="icon" />
            <h3>Modern Curriculum</h3>
            <p>
              Structured academic programs designed to meet evolving
              educational standards.
            </p>
          </div>

          <div className="excellence-card">
            <FaUserShield className="icon" />
            <h3>Safe Environment</h3>
            <p>
              Secure campus with disciplined atmosphere promoting focus
              and learning.
            </p>
          </div>

          <div className="excellence-card">
            <FaTrophy className="icon" />
            <h3>Holistic Development</h3>
            <p>
              Encouraging sports, leadership, cultural and co-curricular
              excellence.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Excellence;