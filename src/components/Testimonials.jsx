import { FaStar } from "react-icons/fa";
import "../styles/testimonials.css";

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">

        <div className="section-header">
          <h2>What Parents Say</h2>
          <p>
            Hear from parents who trust Dwarka Pratishthan for their children's
            academic and personal growth.
          </p>
        </div>

        <div className="testimonial-grid">

          <div className="testimonial-card">
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>
              "The teaching staff is highly dedicated and supportive.
              My child has shown remarkable academic and personal growth."
            </p>
            <h4>— Parent, Little Birds School</h4>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>
              "The disciplined environment and strong academic focus
              make this institution stand out."
            </p>
            <h4>— Parent, Junior College</h4>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>
              "The Defence Academy provides structured preparation
              with excellent guidance and mentorship."
            </p>
            <h4>— Parent, Defence Academy</h4>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Testimonials;