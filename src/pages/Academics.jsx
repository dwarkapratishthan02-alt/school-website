import "../styles/academics.css";

function Academics() {

  return (

    <section className="academics-page">

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <div className="academics-hero">

        <div className="academics-overlay"></div>

        <div className="container academics-hero-content">

          <span className="page-tag">
            Our Academic Programs
          </span>

          <h1>
            Excellence In <br />
            Education & Leadership
          </h1>

          <p>
            Dwarka Pratishthan provides modern,
            value-based and career-focused education
            across all stages of learning.
          </p>

        </div>

      </div>

      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}

      <div className="container">

        {/* HEADER */}

        <div className="academics-header">

          <span className="section-mini-title">
            Academic Structure
          </span>

          <h2>
            Comprehensive Learning Across Every Stage
          </h2>

          <p>
            Our institutions are designed to provide
            holistic education, leadership development,
            discipline, and academic excellence through
            modern teaching methodologies.
          </p>

        </div>

        {/* ========================================= */}
        {/* GRID */}
        {/* ========================================= */}

        <div className="academics-grid">

          {/* ========================================= */}
          {/* SCHOOL */}
          {/* ========================================= */}

          <div className="academic-card">

            <div className="academic-top">

              <div className="academic-icon">
                🎓
              </div>

              <span className="academic-badge">
                School Education
              </span>

            </div>

            <h2>
              Little Birds School
            </h2>

            <p>
              Providing Pre-Primary, Primary and
              Secondary education focused on
              academic excellence, creativity,
              discipline and strong moral values.
            </p>

            {/* FEATURES */}

            <div className="academic-features">

              <div className="feature">
                CBSE & State Board
              </div>

              <div className="feature">
                Smart Learning
              </div>

              <div className="feature">
                Activity Based
              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* JUNIOR COLLEGE */}
          {/* ========================================= */}

          <div className="academic-card">

            <div className="academic-top">

              <div className="academic-icon">
                📚
              </div>

              <span className="academic-badge">
                Higher Secondary
              </span>

            </div>

            <h2>
              Shri Chhatrapati Shivaji Maharaj
              Junior College
            </h2>

            <p>
              Structured higher secondary education
              designed to prepare students for
              professional careers, higher studies
              and competitive examinations.
            </p>

            {/* FEATURES */}

            <div className="academic-features">

              <div className="feature">
                Career Guidance
              </div>

              <div className="feature">
                Competitive Exams
              </div>

              <div className="feature">
                Expert Faculty
              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* DEFENCE */}
          {/* ========================================= */}

          <div className="academic-card">

            <div className="academic-top">

              <div className="academic-icon">
                🛡️
              </div>

              <span className="academic-badge">
                Professional Training
              </span>

            </div>

            <h2>
              Academy of Defence &
              Non-Defence Studies
            </h2>

            <p>
              Professional training programs focused
              on defence services, discipline,
              leadership, physical fitness and
              competitive career preparation.
            </p>

            {/* FEATURES */}

            <div className="academic-features">

              <div className="feature">
                Defence Training
              </div>

              <div className="feature">
                Physical Fitness
              </div>

              <div className="feature">
                Leadership Skills
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Academics;