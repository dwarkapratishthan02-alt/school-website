import "../styles/about.css";

function AboutSection() {
  return (
    <section className="about-section">

      <div className="container about-content">

        {/* LEFT IMAGE */}

        <div className="about-image">

          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754"
            alt="Dwarka Pratishthan Campus"
          />

        </div>


        {/* RIGHT TEXT */}

        <div className="about-text">

          <h2 className="about-title">
            About Dwarka Pratishthan
          </h2>

          <p className="about-description">
            Dwarka Pratishthan is a distinguished educational group committed
            to providing quality education across all levels of learning.
            Through its institutions, the Pratishthan nurtures young minds,
            builds strong academic foundations, and prepares students for
            future success.
          </p>


          <div className="vision-mission">

            <div className="vision-box">

              <h4>Our Vision</h4>

              <p>
                To create responsible, knowledgeable and disciplined citizens
                who contribute positively to society and the nation.
              </p>

            </div>


            <div className="mission-box">

              <h4>Our Mission</h4>

              <p>
                To provide holistic education that combines academic
                excellence, moral values, leadership skills and character
                development.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutSection;