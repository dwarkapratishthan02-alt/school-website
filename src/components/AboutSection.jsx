import "../styles/about.css";

function AboutSection() {

  return (

    <section className="about-section">

      <div className="container about-content">

        {/* ========================================= */}
        {/* LEFT IMAGE SIDE */}
        {/* ========================================= */}

        <div className="about-image">

          {/* MAIN IMAGE */}

          <img
            src="/images/school5.jpeg"
            alt="Dwarka Pratishthan Campus"
          />

          {/* FLOATING CARD */}

          <div className="experience-card">

            <h3>15+</h3>

            <p>
              Years of Educational Excellence
            </p>

          </div>

        </div>

        {/* ========================================= */}
        {/* RIGHT CONTENT */}
        {/* ========================================= */}

        <div className="about-text">

          {/* BADGE */}

          <span className="about-badge">
            About Our Institution
          </span>

          {/* TITLE */}

          <h2 className="about-title">

            Building Future Leaders
            Through Values & Excellence

          </h2>

          {/* DESCRIPTION */}

          <p className="about-description">

            Dwarka Pratishthan is a distinguished educational group
            committed to nurturing young minds through quality education,
            discipline, innovation, and strong moral values.

            Our institutions focus on holistic student development by
            combining academics, leadership, creativity, sports,
            and modern learning methods to prepare students for
            a successful future.

          </p>

          {/* HIGHLIGHTS */}

          <div className="about-highlights">

            <div className="highlight-item">
              ✓ Modern Learning Environment
            </div>

            <div className="highlight-item">
              ✓ Experienced Faculty
            </div>

            <div className="highlight-item">
              ✓ CBSE & State Board Curriculum
            </div>

            <div className="highlight-item">
              ✓ Activity-Based Learning
            </div>

          </div>

          {/* VISION + MISSION */}

          <div className="vision-mission">

            {/* VISION */}

            <div className="vision-box">

              <div className="box-icon">
                👁️
              </div>

              <h4>
                Our Vision
              </h4>

              <p>
                To create responsible, disciplined,
                and knowledgeable citizens who contribute
                positively to society and the nation.
              </p>

            </div>

            {/* MISSION */}

            <div className="mission-box">

              <div className="box-icon">
                🎯
              </div>

              <h4>
                Our Mission
              </h4>

              <p>
                To provide holistic education that combines
                academic excellence, leadership skills,
                innovation, moral values, and character development.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutSection;