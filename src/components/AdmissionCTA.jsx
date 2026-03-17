import { useNavigate } from "react-router-dom";
import "../styles/admission.css";

function AdmissionCTA() {

  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <section className="admission-cta">

      <div className="container admission-content">

        <div className="admission-text">

          <h2>Admissions Starting Soon for 2026-27</h2>

          <p>
            Admissions for the academic year 2026-27 will commence shortly.
            Stay connected with Dwarka Pratishthan and take the first step
            toward academic excellence, discipline, and holistic development.
          </p>

        </div>

        <button
          className="admission-btn"
          onClick={goToContact}
        >
          Contact for Admission
        </button>

      </div>

    </section>
  );
}

export default AdmissionCTA;