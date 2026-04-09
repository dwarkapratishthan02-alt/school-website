import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

// 🔥 IMPORT YOUR LOGO
import logo from "../assets/logo.png"; // make sure path is correct

function Hero() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadSlides();
  }, []);

  async function loadSlides() {
    try {
      const { data, error } = await supabase
        .from("sliders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) return;

      const activeSlides = data?.filter(
        (slide) => slide.active !== false
      );

      setSlides(activeSlides || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <section className="hero">

      {/* BACKGROUND SLIDER */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-bg ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image_url})` }}
        />
      ))}

      {/* OVERLAY */}
      <div className="hero-overlay"></div>

      {/* CONTENT */}
      <div className="hero-content">

        {/* 🔥 LEFT SIDE (TEXT) */}
        <div className="hero-left">

          <h1>
            Shaping Future Leaders <br />
            <span>with Values & Excellence</span>
          </h1>

          <p>
            15+ Years of Quality Education at Dwarka Pratishthan
          </p>

          <div className="hero-buttons">

            <button
              className="btn-primary"
              onClick={() => navigate("/contact")}
            >
              Apply Now
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>

          </div>

        </div>

        {/* 🔥 RIGHT SIDE (LOGO) */}
        <div className="hero-right">
          <img src={logo} alt="School Logo" />
        </div>

      </div>

    </section>
  );
}

export default Hero;