import "../styles/aboutPage.css";
import campusImg from "../assets/school-campus.jpg";

function About() {
  return (
    <section className="about-page">

      {/* HERO SECTION */}
      <div className="about-hero">

        <div className="about-hero-overlay"></div>

        <div className="container about-hero-content">

          <span className="about-tag">
            About Our Institution
          </span>

          <h1>
            Building Future Leaders <br />
            Through Values & Excellence
          </h1>

          <p>
            Dwarka Pratishthan has been shaping young minds for over
            15+ years through disciplined learning, holistic development,
            and modern education rooted in strong Indian values.
          </p>

          <div className="hero-stats">

            <div className="hero-stat">
              <h3>15+</h3>
              <span>Years Legacy</span>
            </div>

            <div className="hero-stat">
              <h3>4+</h3>
              <span>Institutions</span>
            </div>

            <div className="hero-stat">
              <h3>1000+</h3>
              <span>Students</span>
            </div>

          </div>

        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="container">

        {/* INTRO */}
        <div className="about-intro">

          {/* IMAGE */}
          <div className="about-image">

            <img
              src={campusImg}
              alt="Dwarka Pratishthan Campus"
              className="about-img"
            />

            <div className="image-card">
              <h3>15+</h3>
              <p>Years of Educational Excellence</p>
            </div>

          </div>

          {/* TEXT */}
          <div className="about-text">

            <span className="section-mini-title">
              Our Introduction
            </span>

            <h2>
              A Modern Institution Built On Discipline,
              Knowledge & Character
            </h2>

            <p>
              Dwarka Pratishthan is a respected educational group
              committed to nurturing responsible and academically
              strong students through holistic education and
              value-based learning.
            </p>

            <p>
              Through Little Birds School, Dwarka Pratishthan
              International Gurukul, Junior College, and the
              Defence & Non-Defence Academy, we prepare students
              for academic excellence, leadership and future success.
            </p>

            {/* FEATURES */}
            <div className="about-features">

              <div className="feature-item">
                ✓ Modern Learning Environment
              </div>

              <div className="feature-item">
                ✓ Experienced Faculty
              </div>

              <div className="feature-item">
                ✓ CBSE & State Board Curriculum
              </div>

              <div className="feature-item">
                ✓ Activity-Based Learning
              </div>

            </div>

          </div>

        </div>

        {/* JOURNEY */}
        <div className="journey-section">

          <div className="journey-left">

            <span className="section-mini-title">
              Our Journey
            </span>

            <h2>
              15+ Years Of Educational Excellence
            </h2>

          </div>

          <div className="journey-right">

            <p>
              Over the years, Dwarka Pratishthan has evolved into
              a multi-institution educational ecosystem dedicated
              to academic excellence, discipline and holistic
              student development.
            </p>

            <p>
              Our mission continues to empower students with
              knowledge, confidence and strong moral values
              while creating future-ready leaders.
            </p>

          </div>

        </div>

        {/* VISION & MISSION */}
        <div className="vision-mission">

          {/* VISION */}
          <div className="vm-card">

            <div className="vm-icon">
              🎯
            </div>

            <h3>Our Vision</h3>

            <p>
              To create disciplined, knowledgeable and
              responsible citizens by combining traditional
              Indian values with modern education.
            </p>

          </div>

          {/* MISSION */}
          <div className="vm-card">

            <div className="vm-icon">
              🚀
            </div>

            <h3>Our Mission</h3>

            <p>
              To provide quality education, leadership skills,
              emotional development and character-building
              opportunities for every student.
            </p>

          </div>

        </div>

        {/* VALUES */}
        <div className="core-values">

          <span className="section-mini-title">
            Core Values
          </span>

          <h2>
            What Defines Dwarka Pratishthan
          </h2>

          <div className="values-grid">

            <div className="value-card">
              Academic Excellence
            </div>

            <div className="value-card">
              Discipline & Responsibility
            </div>

            <div className="value-card">
              Leadership Development
            </div>

            <div className="value-card">
              Holistic Growth
            </div>

            <div className="value-card">
              Innovation & Creativity
            </div>

            <div className="value-card">
              Service To Society
            </div>

          </div>

          <p className="impact-text">
            Inspired by the teachings of
            <strong> Swami Vivekananda</strong>,
            we believe education should empower students
            to become confident, compassionate and
            socially responsible individuals.
          </p>

        </div>

      </div>

    </section>
  );
}

export default About;