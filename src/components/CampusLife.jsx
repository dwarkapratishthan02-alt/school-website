import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/campus.css";

function CampusLife() {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampusImages();
  }, []);

  // =========================================
  // FETCH IMAGES
  // =========================================

  async function fetchCampusImages() {

    try {

      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("category", "Campus")
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log("Campus Images:", data);

      setImages(data || []);

    } catch (err) {

      console.error("Campus Error:", err);

    } finally {

      setLoading(false);

    }
  }

  return (

    <section className="campus-life">

      {/* ========================================= */}
      {/* TOP HEADER */}
      {/* ========================================= */}

      <div className="campus-top">

        <div className="campus-badge">
          Student Experience
        </div>

        <h2>
          Life At Our Campus
        </h2>

        <p>
          Discover a vibrant campus environment where academics,
          sports, creativity, leadership, and holistic development
          come together to shape future-ready students.
        </p>

      </div>

      {/* ========================================= */}
      {/* IMAGE GRID */}
      {/* ========================================= */}

      <div className="campus-grid">

        {loading ? (

          <div className="campus-empty">
            <h3>Loading Campus Images...</h3>
          </div>

        ) : images.length === 0 ? (

          <div className="campus-empty">
            <h3>No Campus Images Available</h3>
            <p>
              Campus memories and highlights will appear here soon.
            </p>
          </div>

        ) : (

          images.map((img, index) => (

            <div
              className={`campus-card ${
                index === 0 ? "large" : ""
              }`}
              key={img.id}
            >

              {/* IMAGE */}

              <img
                src={img.image_url}
                alt={img.category || "Campus"}
                onError={(e) => {
                  e.target.src = "/images/fallback.jpg";
                }}
              />

              {/* OVERLAY */}

              <div className="campus-overlay">

                <div className="overlay-content">

                  <span className="overlay-tag">
                    Campus Life
                  </span>

                  <h3>
                    Dwarka Pratishthan
                  </h3>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  );
}

export default CampusLife;