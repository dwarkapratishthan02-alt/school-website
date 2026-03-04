import "../styles/contact.css";

function Contact() {
  return (
    <section className="contact-page">
      <div className="container">

        <div className="page-header">
          <h1>Contact Us</h1>
          <p>
            Get in touch with Dwarka Pratishthan for admissions,
            inquiries and campus visits.
          </p>
        </div>

        <div className="contact-grid">

          {/* Left Side - Contact Info */}
          <div className="contact-info">
            <h3>Contact Information</h3>

            <p><strong>Address:</strong> Your City, Maharashtra</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> info@dwarkapratishthan.edu</p>
            <p><strong>Office Hours:</strong> 9:00 AM – 5:00 PM (Mon-Sat)</p>
          </div>

          {/* Right Side - Inquiry Form */}
          <div className="contact-form">
            <h3>Send an Inquiry</h3>

            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <textarea placeholder="Your Message" rows="5" required></textarea>

              <button type="submit">Submit Inquiry</button>
            </form>
          </div>

        </div>

        {/* Map Placeholder */}
        <div className="map-section">
          <h3>Campus Location</h3>
          <div className="map-placeholder">
            Google Map will be embedded here.
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;