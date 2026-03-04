import "../styles/institutions.css";

function Institutions() {
  return (
    <section className="institutions">
      <div className="container">

        <div className="section-header">
          <h2>Our Institutions</h2>
          <p>
            Dwarka Pratishthan provides comprehensive education through its
            group of institutions catering to all stages of learning.
          </p>
        </div>

        <div className="institution-grid">

          <div className="institution-card">
            <h3>Little Birds School</h3>
            <p className="institution-level">
              Pre-Primary | Primary | Secondary
            </p>
            <p>
              A nurturing environment focused on academic excellence,
              character building and holistic development.
            </p>
            <button className="outline-btn">Learn More</button>
          </div>

          <div className="institution-card">
            <h3>Shri Chhatrapati Shivaji Maharaj Junior College</h3>
            <p className="institution-level">
              Higher Secondary Education
            </p>
            <p>
              Providing strong academic foundation and career-oriented
              education for future professionals.
            </p>
            <button className="outline-btn">Learn More</button>
          </div>

          <div className="institution-card">
            <h3>Academy of Defence & Non-Defence Studies</h3>
            <p className="institution-level">
              Competitive & Career Training
            </p>
            <p>
              Dedicated preparation for defence services and other
              competitive career paths with discipline and excellence.
            </p>
            <button className="outline-btn">Learn More</button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Institutions;