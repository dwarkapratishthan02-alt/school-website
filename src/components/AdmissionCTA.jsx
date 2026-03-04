import "../styles/admission.css";

function AdmissionCTA() {
  return (
    <section className="admission-cta">
      <div className="container admission-content">

        <h2>Admissions Starting Soon for 2026-27</h2>

        <p>
          Admissions for the academic year 2026-27 will commence shortly.
          Stay connected with Dwarka Pratishthan and take the first step
          toward academic excellence, discipline, and holistic development.
        </p>

        <div className="cta-buttons">

          {/* Download Prospectus Button */}
          <a 
            href="/prospectus.pdf" 
            download 
            className="prospectus-link"
          >
            <button className="cta-primary">
              Download Prospectus
            </button>
          </a>

        </div>

      </div>
    </section>
  );
}

export default AdmissionCTA;