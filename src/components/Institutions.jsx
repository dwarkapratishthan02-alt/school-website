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

            <div className="institution-image">
              <img src="/images/littlebirds.jpg" alt="Little Birds School" />
            </div>

            <h3>Little Birds School</h3>

            <p className="institution-level">
              Pre-Primary | Primary | Secondary
            </p>

            <p>
              A nurturing environment focused on academic excellence,
              character building and holistic development.
            </p>


          </div>


          <div className="institution-card">

            <div className="institution-image">
              <img src="/images/juniorcollege.jpg" alt="Junior College" />
            </div>

            <h3>Shri Chhatrapati Shivaji Maharaj Junior College</h3>

            <p className="institution-level">
              Higher Secondary Education
            </p>

            <p>
              Providing strong academic foundation and career-oriented
              education for future professionals.
            </p>


          </div>


          <div className="institution-card">

            <div className="institution-image">
              <img src="/images/defenceacademy.jpg" alt="Defence Academy" />
            </div>

            <h3>Academy of Defence & Non-Defence Studies</h3>

            <p className="institution-level">
              Competitive & Career Training
            </p>

            <p>
              Dedicated preparation for defence services and other
              competitive career paths with discipline and excellence.
            </p>


          </div>

        </div>
      </div>
    </section>
  );
}

export default Institutions;