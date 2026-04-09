import "../styles/aboutPage.css";
import campusImg from "../assets/school-campus.jpg";

function About() {
  return (
    <section className="about-page">
      <div className="container">

        {/* HEADER */}
        <div className="about-header">
          <span className="about-tag">About Us</span>

          <h1>About Dwarka Pratishthan</h1>

          <p>
            For over <strong>15 years</strong>, Dwarka Pratishthan has maintained a
            legacy of excellence, consistently providing quality learning experiences
            and nurturing young minds for a bright future.
          </p>

          <div className="header-divider"></div>
        </div>

        {/* INTRO + IMAGE */}
        <div className="about-intro">

          <div className="about-text">
            <h2>Our Introduction</h2>

            <p>
              Dwarka Pratishthan is a respected educational group dedicated
              to providing comprehensive learning opportunities from foundational
              schooling to higher secondary education and professional training.
            </p>

            <p>
              Through <strong>Little Birds School</strong>,
              <strong> Dwarka Pratishthan International Gurukul</strong>,
              <strong> Junior College</strong>, and the
              <strong> Defence & Non-Defence Academy</strong>, we nurture
              disciplined, responsible and academically strong individuals.
            </p>

            <div className="about-highlight">
              Excellence • Discipline • Leadership • Values
            </div>
          </div>

          <div className="about-image">
            <img
              src={campusImg}
              alt="Dwarka Pratishthan Campus"
              className="about-img"
            />
          </div>

        </div>

        {/* JOURNEY */}
        <div className="about-journey">
          <div className="journey-card">
            <h2>Our Journey</h2>

            <p>
              Over the past 15+ years, Dwarka Pratishthan has grown into a
              multi-institution educational ecosystem known for academic excellence,
              discipline and holistic development. Our journey reflects a deep
              commitment to shaping future leaders with strong values.
            </p>
          </div>
        </div>

        {/* VISION MISSION */}
        <div className="vision-mission">

          <div className="vm-card">
            <div className="vm-icon">🎯</div>

            <h3>Our Vision</h3>

            <p>
              To create a nurturing residential Gurukul that blends ancient
              Indian values with modern digital education, empowering students
              to realize their true potential.
            </p>
          </div>

          <div className="vm-card">
            <div className="vm-icon">🚀</div>

            <h3>Our Mission</h3>

            <p>
              Our mission is to provide quality, modern and value-based education
              to underprivileged, orphaned and drought-affected children, including
              those impacted by migration and farmer suicides.
            </p>

            <p>
              Along with academics, we focus on character building, leadership,
              physical fitness and emotional well-being to ensure holistic development.
            </p>
          </div>

        </div>

        {/* VALUES + IMPACT */}
        <div className="core-values">

          <h2>Our Core Values & Impact</h2>

          <div className="values-grid">
            <div className="value">Academic Excellence</div>
            <div className="value">Discipline & Responsibility</div>
            <div className="value">Holistic Development</div>
            <div className="value">Leadership & Character</div>
            <div className="value">Service to Society</div>
          </div>

          <p className="impact-text">
            Inspired by the teachings of <strong>Swami Vivekananda</strong>,
            we strive to help every child realize their true potential. Beyond
            education, Dwarka Pratishthan actively supports farmers and orphan
            children through various social initiatives, working towards building
            a strong and compassionate society.
          </p>

        </div>

      </div>
    </section>
  );
}

export default About;