import "../styles/aboutPage.css";

function About() {
  return (
    <section className="about-page">
      <div className="container">

        <div className="page-header">
          <h1>About Dwarka Pratishthan</h1>
          <p>
            Building a legacy of excellence in education across schools,
            junior college and professional academy.
          </p>
        </div>

        <div className="about-content-section">
          <h2>Our Introduction</h2>
          <p>
            Dwarka Pratishthan is a respected educational group dedicated
            to providing comprehensive learning opportunities from
            foundational schooling to higher secondary education and
            professional academy training.
          </p>

          <p>
            Through Little Birds School, Shri Chhatrapati Shivaji Maharaj
            Junior College, and the Academy of Defence & Non-Defence
            Studies, we aim to nurture disciplined, responsible and
            academically strong individuals.
          </p>
        </div>

        <div className="history-section">
          <h2>Our Journey</h2>
          <p>
            Since its establishment, Dwarka Pratishthan has steadily grown
            into a multi-institution educational group known for academic
            excellence, disciplined environment and holistic development.
          </p>
        </div>

        <div className="vision-mission-section">
          <div>
            <h3>Vision</h3>
            <p>
              To create knowledgeable, ethical and responsible citizens
              who contribute positively to society and the nation.
            </p>
          </div>

          <div>
            <h3>Mission</h3>
            <p>
              To deliver quality education by integrating academics,
              moral values, leadership skills and character development.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2>Core Values</h2>
          <ul>
            <li>Academic Integrity</li>
            <li>Discipline & Responsibility</li>
            <li>Holistic Development</li>
            <li>Leadership & Service</li>
            <li>Continuous Improvement</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default About;