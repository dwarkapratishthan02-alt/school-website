import "../styles/admissions.css";

function Admissions() {

  // Later this can come from Admin Panel / Supabase
  const admissionsOpen = false;

  return (
    <section className="admissions-page">
      <div className="container">

        {/* HERO */}

        <div className="admissions-hero">

          <span className="page-tag">Admissions</span>

          <h1>Admissions 2026–27</h1>

          <p>
            Begin your academic journey with Dwarka Pratishthan —
            where excellence, discipline and holistic development
            shape future leaders.
          </p>

          <div className="header-divider"></div>

        </div>


        {/* OVERVIEW */}

        <div className="admission-card">

          <h2>Admission Overview</h2>

          <p>
            Dwarka Pratishthan welcomes students who aspire to achieve
            academic excellence and disciplined growth. Admissions are
            granted based on eligibility criteria, merit, and seat availability.
          </p>

        </div>


        {/* ELIGIBILITY */}

        <div className="admission-card">

          <h2>Eligibility Criteria</h2>

          <div className="admission-grid">

            <div className="admission-item">
              <h4>Little Birds School</h4>
              <p>As per age criteria and previous academic records.</p>
            </div>

            <div className="admission-item">
              <h4>Junior College</h4>
              <p>Completion of Secondary School with qualifying marks.</p>
            </div>

            <div className="admission-item">
              <h4>Defence & Non-Defence Academy</h4>
              <p>Eligibility as per specific course requirements.</p>
            </div>

          </div>

        </div>


        {/* PROCESS */}

        <div className="admission-card">

          <h2>Admission Process</h2>

          <div className="process-steps">

            <div className="step">
              <span>1</span>
              Submit inquiry or visit campus
            </div>

            <div className="step">
              <span>2</span>
              Fill out application form
            </div>

            <div className="step">
              <span>3</span>
              Submit required documents
            </div>

            <div className="step">
              <span>4</span>
              Interaction / counseling session
            </div>

            <div className="step">
              <span>5</span>
              Confirmation upon approval
            </div>

          </div>

        </div>


        {/* DOCUMENTS */}

        <div className="admission-card">

          <h2>Required Documents</h2>

          <div className="documents-grid">

            <div>Previous academic mark sheets</div>
            <div>Birth certificate</div>
            <div>Aadhar card copy</div>
            <div>Passport size photographs</div>
            <div>Transfer certificate (if applicable)</div>

          </div>

        </div>


        {/* CTA STATUS */}

        <div className="admission-cta-box">

          {admissionsOpen ? (
            <>
              <h3>Admissions Now Open</h3>

              <p>
                Applications are currently being accepted.
                Please visit the campus or contact the admission office
                for further details.
              </p>

              <button className="admission-btn">
                Contact Admission Office
              </button>
            </>
          ) : (
            <>
              <h3>Admissions Opening Soon</h3>

              <p>
                Admissions for the academic year 2026–27 will begin shortly.
                Please stay connected for official updates from the institution.
              </p>
            </>
          )}

        </div>

      </div>
    </section>
  );
}

export default Admissions;