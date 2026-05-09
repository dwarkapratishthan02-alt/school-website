import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaPlayCircle,
} from "react-icons/fa";

import "../styles/hero.css";

import logo from "../assets/logo.png";

function Hero() {

  const [slides, setSlides] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  const navigate = useNavigate();

  /* ========================================= */
  /* LOAD SLIDES */
  /* ========================================= */

  useEffect(() => {
    loadSlides();
  }, []);

  async function loadSlides() {

    try {

      const { data, error } =
        await supabase
          .from("sliders")
          .select("*")
          .order(
            "created_at",
            { ascending: false }
          );

      if (error) return;

      const activeSlides =
        data?.filter(
          (slide) =>
            slide.active !== false
        );

      setSlides(activeSlides || []);

    } catch (err) {

      console.error(err);

    }

  }

  /* ========================================= */
  /* AUTO SLIDER */
  /* ========================================= */

  useEffect(() => {

    if (slides.length <= 1) return;

    const interval =
      setInterval(() => {

        setCurrent((prev) =>
          (prev + 1) % slides.length
        );

      }, 5000);

    return () =>
      clearInterval(interval);

  }, [slides]);

  return (

    <section className="hero">

      {/* ========================================= */}
      {/* BACKGROUND SLIDES */}
      {/* ========================================= */}

      {slides.map((slide, index) => (

        <div
          key={slide.id}
          className={`hero-bg ${
            index === current
              ? "active"
              : ""
          }`}
          style={{
            backgroundImage:
              `url(${slide.image_url})`,
          }}
        />

      ))}

      {/* ========================================= */}
      {/* OVERLAY */}
      {/* ========================================= */}

      <div className="hero-overlay"></div>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <div className="hero-container">

        {/* ========================================= */}
        {/* LEFT SIDE */}
        {/* ========================================= */}

        <div className="hero-left">

          <div className="hero-badge">
            Trusted Education Since 2012
          </div>

          <h1>

            Building Future
            Leaders Through

            <span>
              {" "}Values &
              Excellence
            </span>

          </h1>

          <p>

            Dwarka Pratishthan
            empowers students with
            quality education,
            discipline, innovation,
            and holistic development
            for a successful future.

          </p>

          {/* BUTTONS */}

          <div className="hero-buttons">

            <button
              className="hero-btn primary-btn"
              onClick={() =>
                navigate("/contact")
              }
            >

              Apply Now

              <FaArrowRight />

            </button>

            <button
              className="hero-btn secondary-btn"
              onClick={() =>
                navigate("/about")
              }
            >

              <FaPlayCircle />

              Learn More

            </button>

          </div>

          {/* STATS */}

          <div className="hero-stats">

            <div>
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>

            <div>
              <h3>2500+</h3>
              <p>Students</p>
            </div>

            <div>
              <h3>100%</h3>
              <p>Growth Focused</p>
            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* RIGHT SIDE */}
        {/* ========================================= */}

        <div className="hero-right">

          <div className="hero-logo-card">

            <img
              src={logo}
              alt="Dwarka Pratishthan"
              className="hero-school-logo"
            />

            <div className="hero-logo-text">

              <h2>
                Dwarka Pratishthan
              </h2>

              <p>
                Excellence In Education
              </p>

            </div>

            <div className="hero-logo-line"></div>

            <span className="hero-slogan">

              संस्कार • शिक्षण • प्रगती

            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;