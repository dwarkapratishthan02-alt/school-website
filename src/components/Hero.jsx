import { useEffect, useState } from "react";
import "../styles/hero.css";

function Home() {

  /* 
    🔹 Later this will come from Admin Panel (Supabase)
    Structure already production-ready
  */
  const adminSlides = [
    {
      id: 1,
      image: "/images/slide1.jpg",
      active: true,
    },
    {
      id: 2,
      image: "/images/slide2.jpg",
      active: true,
    },
    {
      id: 3,
      image: "/images/slide3.jpg",
      active: true,
    },
  ];

  // Only show active slides
  const slides = adminSlides.filter(slide => slide.active);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="hero">
      <div className="container hero-grid">

        {/* LEFT CONTENT */}
        <div className="hero-left">
          <h1>Dwarka Pratishthan</h1>

          <p className="hero-sub">
            Empowering Education Across All Stages of Learning
          </p>

          <p>
            <strong>Little Birds School</strong> – Pre-Primary, Primary & Secondary
          </p>

          <p>
            <strong>Shri Chhatrapati Shivaji Maharaj Junior College</strong>
          </p>

          <p>
            <strong>Academy of Defence & Non-Defence Studies</strong>
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              Explore Institutions
            </button>

            <button className="btn-outline">
              Admission Open 2026
            </button>
          </div>
        </div>

        {/* RIGHT VERTICAL SLIDER */}
        <div className="hero-slider">

          {slides.length > 0 ? (
            <div
              className="slider-wrapper"
              style={{
                transform: `translateY(-${current * 100}%)`
              }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="slide">
                  <img
                    src={slide.image}
                    alt="School Slide"
                  />
                </div>
              ))}
            </div>
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

export default Home;