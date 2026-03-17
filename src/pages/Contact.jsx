import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/contact.css";

function Contact() {

  const [settings, setSettings] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    loadContactSettings();
  }, []);

  async function loadContactSettings() {

    const { data } = await supabase
      .from("contact_settings")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setSettings(data);
    }

  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("contact_messages")
      .insert([
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

        {/* HEADER */}

        <div className="page-header">
          <h1>Contact Us</h1>
          <p>
            Get in touch with Dwarka Pratishthan for admissions,
            inquiries and campus visits.
          </p>
        </div>


        {/* GRID */}

        <div className="contact-grid">

          {/* CONTACT INFO */}

          <div className="contact-info">

            <h3>Contact Information</h3>

            <p>
              <strong>Address:</strong>{" "}
              {settings?.address || "Address not available"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {settings?.phone || "Phone not available"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {settings?.email || "Email not available"}
            </p>

            <p>
              <strong>Office Hours:</strong>{" "}
              {settings?.office_hours || "Not available"}
            </p>

          </div>


          {/* CONTACT FORM */}

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

              <button type="submit">
                Submit Inquiry
              </button>

            </form>

          </div>

        </div>


        {/* MAP SECTION */}

        <div className="map-section">

          <h3>Campus Location</h3>

          {settings?.map_embed ? (

            <iframe
              src={settings.map_embed}
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
            />

          ) : (

            <div className="map-placeholder">
              Map location not added yet.
            </div>

          )}

        </div>

      </div>
    </section>
  );
}

export default Contact;