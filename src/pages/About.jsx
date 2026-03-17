import "../styles/aboutPage.css";

function About() {
  return (
    <section className="about-page">
      <div className="container">

        {/* HEADER */}

        <div className="about-header">

          <span className="about-tag">About Us</span>

          <h1>About Dwarka Pratishthan</h1>

          <p>
            Building a legacy of excellence in education across schools,
            junior college and professional academy training.
          </p>

          <div className="header-divider"></div>

        </div>


        {/* INTRO + IMAGE */}

        <div className="about-intro">

          <div className="about-text">

            <h2>Our Introduction</h2>

            <p>
              Dwarka Pratishthan is a respected educational group dedicated
              to providing comprehensive learning opportunities from
              foundational schooling to higher secondary education and
              professional academy training.
            </p>

            <p>
              Through <strong>Little Birds School</strong>,
              <strong> Shri Chhatrapati Shivaji Maharaj Junior College</strong>,
              and the <strong>Academy of Defence & Non-Defence Studies</strong>,
              we aim to nurture disciplined, responsible and academically
              strong individuals.
            </p>

            <div className="about-highlight">
              Excellence • Discipline • Leadership
            </div>

          </div>

          <div className="about-image">
            <img
              src="/images/school-campus.jpg"
              alt="Dwarka Pratishthan Campus"
            />
          </div>

        </div>


        {/* JOURNEY */}

        <div className="about-journey">

          <div className="journey-card">

            <h2>Our Journey</h2>

            <p>
              Since its establishment, Dwarka Pratishthan has steadily grown
              into a multi-institution educational group known for academic
              excellence, disciplined environment and holistic development.
            </p>

          </div>

        </div>


        {/* VISION MISSION */}

        <div className="vision-mission">

          <div className="vm-card">

            <div className="vm-icon">🎯</div>

            <h3>Our Vision</h3>

            <p>
              To create knowledgeable, ethical and responsible citizens
              who contribute positively to society and the nation.
            </p>

          </div>


          <div className="vm-card">

            <div className="vm-icon">🚀</div>

            <h3>Our Mission</h3>

            <p>
              To deliver quality education by integrating academics,
              moral values, leadership skills and character development.
            </p>

          </div>

        </div>


        {/* CORE VALUES */}

        <div className="core-values">

          <h2>Core Values</h2>

          <div className="values-grid">

            <div className="value">Academic Integrity</div>
            <div className="value">Discipline & Responsibility</div>
            <div className="value">Holistic Development</div>
            <div className="value">Leadership & Service</div>
            <div className="value">Continuous Improvement</div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;