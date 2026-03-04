import { useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      }
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Inquiry sent successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  }

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

          {/* Left Side */}
          <div className="contact-info">
            <h3>Contact Information</h3>

            <p><strong>Address:</strong> Your City, Maharashtra</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> info@dwarkapratishthan.edu</p>
            <p><strong>Office Hours:</strong> 9:00 AM – 5:00 PM (Mon-Sat)</p>
          </div>

          {/* Right Side Form */}
          <div className="contact-form">
            <h3>Send an Inquiry</h3>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit">Submit Inquiry</button>

            </form>
          </div>

        </div>

        {/* Map */}
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