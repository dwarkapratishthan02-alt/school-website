import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    loadImages();
  }, []);

  // 🔥 LOAD IMAGES
  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log("Gallery Data:", data); // 🔍 DEBUG

      setImages(data || []);

    } catch (err) {
      console.error("Gallery Error:", err);
    }
  };

  // ✅ FIXED FILTER (case insensitive)
  const filteredImages =
    category === "all"
      ? images
      : images.filter(
          (img) =>
            img.category &&
            img.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <section className="gallery-page">
      <div className="container">

        {/* HEADER */}
        <div className="page-header">
          <span className="page-tag">Campus Moments</span>

          <h1>Gallery</h1>

          <p>
            Glimpses of campus life, academic excellence and co-curricular
            activities at Dwarka Pratishthan.
          </p>

          <div className="header-divider"></div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="gallery-filters">

          <button
            className={category === "all" ? "active" : ""}
            onClick={() => setCategory("all")}
          >
            All
          </button>

          <button
            className={category === "Academics" ? "active" : ""}
            onClick={() => setCategory("Academics")}
          >
            Academics
          </button>

          <button
            className={category === "Sports" ? "active" : ""}
            onClick={() => setCategory("Sports")}
          >
            Sports
          </button>

          <button
            className={category === "Events" ? "active" : ""}
            onClick={() => setCategory("Events")}
          >
            Events
          </button>

          <button
            className={category === "Campus" ? "active" : ""}
            onClick={() => setCategory("Campus")}
          >
            Campus
          </button>

        </div>

        {/* IMAGE GRID */}
        <div className="gallery-grid">

          {filteredImages.length === 0 ? (
            <p className="no-images">No images available</p>
          ) : (
            filteredImages.map((img) => (
              <div className="gallery-card" key={img.id}>
                <img
                  src={img.image_url}
                  alt={img.category || "Gallery image"}
                />
              </div>
            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default Gallery;