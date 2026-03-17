import "../styles/academics.css";

function Academics() {
  return (
    <section className="academics-page">
      <div className="container">

        {/* PAGE HEADER */}

        <div className="page-header">

          <span className="page-tag">Our Education</span>

          <h1>Academics</h1>

          <p>
            Comprehensive education across all stages under Dwarka Pratishthan.
          </p>

          <div className="header-divider"></div>

        </div>


        {/* ACADEMIC PROGRAMS */}

        <div className="academics-grid">

          {/* SCHOOL */}

          <div className="academic-card">

            <div className="academic-icon">🎓</div>

            <h2>Little Birds School</h2>

            <p>
              Providing Pre-Primary, Primary and Secondary education with
              focus on strong academic foundation and character building.
            </p>

          </div>


          {/* JUNIOR COLLEGE */}

          <div className="academic-card">

            <div className="academic-icon">📚</div>

            <h2>Shri Chhatrapati Shivaji Maharaj Junior College</h2>

            <p>
              Higher Secondary education offering structured curriculum
              designed to prepare students for professional careers and
              competitive examinations.
            </p>

          </div>


          {/* ACADEMY */}

          <div className="academic-card">

            <div className="academic-icon">🛡️</div>

            <h2>Academy of Defence & Non-Defence Studies</h2>

            <p>
              Professional training and preparation programs for defence
              services and other competitive career paths.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Academics;