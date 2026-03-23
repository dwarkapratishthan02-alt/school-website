import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

function Hero() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    loadSlides();
  }, []);

  // 🔥 LOAD SLIDES (SAFE VERSION)
  async function loadSlides() {
    try {
      const { data, error } = await supabase
        .from("sliders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch Error:", error);
        return;
      }

      console.log("Slides Data:", data); // 🔍 DEBUG

      // ✅ Extra safety filter (in case active column exists)
      const activeSlides = data?.filter(
        (slide) => slide.active !== false
      );

      setSlides(activeSlides || []);

    } catch (err) {
      console.error("Slider Error:", err);
    }
  }

  // 🔥 AUTO SLIDER
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <section className="hero">
      <div className="container hero-grid">

        {/* LEFT CONTENT */}
        <div className="hero-left">

          <h1 className="hero-title">
            Dwarka Pratishthan
          </h1>

          <p className="hero-sub">
            Empowering Education Across All Stages of Learning
          </p>

          <ul className="hero-institutions">
            <li>
              <strong>Little Birds School</strong> – Pre-Primary, Primary & Secondary
            </li>
            <li>
              <strong>Shri Chhatrapati Shivaji Maharaj Junior College</strong>
            </li>
            <li>
              <strong>Academy of Defence & Non-Defence Studies</strong>
            </li>
          </ul>

          <div className="hero-buttons">
            <button
              className="btn-primary hero-btn"
              onClick={goToContact}
            >
              Contact Now
            </button>
          </div>

        </div>

        {/* RIGHT SLIDER */}
        <div className="hero-slider">

          {slides.length > 0 ? (

            slides.map((slide, index) => (

              <img
                key={slide.id}
                src={slide.image_url}
                alt="Slide"
                className={`slide-image ${
                  index === current ? "active" : ""
                }`}
              />

            ))

          ) : (

            <div className="no-slide">
              <p>No slides available</p>
            </div>

          )}

        </div>

      </div>
    </section>
  );
}

export default Hero;