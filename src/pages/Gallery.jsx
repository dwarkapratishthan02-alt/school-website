import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/gallery.css";

function Gallery() {

  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  /* ========================================= */
  /* LOAD IMAGES */
  /* ========================================= */

  const loadImages = async () => {

    try {

      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log("Gallery Data:", data);

      setImages(data || []);

    } catch (err) {

      console.error("Gallery Error:", err);

    }
  };

  /* ========================================= */
  /* FILTER */
  /* ========================================= */

  const filteredImages =
    category === "all"
      ? images
      : images.filter(
          (img) =>
            img.category &&
            img.category.toLowerCase() ===
              category.toLowerCase()
        );

  return (

    <section className="gallery-page">

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <div className="gallery-hero">

        <div className="gallery-overlay"></div>

        <div className="container gallery-hero-content">

          <span className="page-tag">
            Campus Memories
          </span>

          <h1>
            Moments That Define <br />
            Our Journey
          </h1>

          <p>
            Explore glimpses of academics,
            sports, cultural activities,
            campus life and memorable events
            at Dwarka Pratishthan.
          </p>

        </div>

      </div>

      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}

      <div className="container">

        {/* HEADER */}

        <div className="gallery-header">

          <span className="section-mini-title">
            Photo Collection
          </span>

          <h2>
            Our Campus Gallery
          </h2>

          <p>
            Capturing inspiring moments,
            achievements, celebrations and
            vibrant student experiences.
          </p>

        </div>

        {/* ========================================= */}
        {/* FILTERS */}
        {/* ========================================= */}

        <div className="gallery-filters">

          <button
            className={
              category === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setCategory("all")
            }
          >
            All
          </button>

          <button
            className={
              category === "Academics"
                ? "active"
                : ""
            }
            onClick={() =>
              setCategory("Academics")
            }
          >
            Academics
          </button>

          <button
            className={
              category === "Sports"
                ? "active"
                : ""
            }
            onClick={() =>
              setCategory("Sports")
            }
          >
            Sports
          </button>

          <button
            className={
              category === "Events"
                ? "active"
                : ""
            }
            onClick={() =>
              setCategory("Events")
            }
          >
            Events
          </button>

          <button
            className={
              category === "Campus"
                ? "active"
                : ""
            }
            onClick={() =>
              setCategory("Campus")
            }
          >
            Campus
          </button>

        </div>

        {/* ========================================= */}
        {/* GRID */}
        {/* ========================================= */}

        <div className="gallery-grid">

          {filteredImages.length === 0 ? (

            <div className="gallery-empty">

              <h3>
                No Images Available
              </h3>

              <p>
                Gallery images will appear here soon.
              </p>

            </div>

          ) : (

            filteredImages.map(
              (img, index) => (

                <div
                  className={`gallery-card ${
                    index === 0
                      ? "large"
                      : ""
                  }`}
                  key={img.id}
                  onClick={() =>
                    setSelectedImage(img)
                  }
                >

                  {/* IMAGE */}

                  <img
                    src={img.image_url}
                    alt={
                      img.category ||
                      "Gallery image"
                    }
                  />

                  {/* OVERLAY */}

                  <div className="gallery-card-overlay">

                    <div className="overlay-content">

                      <span>
                        {img.category ||
                          "Gallery"}
                      </span>

                      <h3>
                        Dwarka Pratishthan
                      </h3>

                    </div>

                  </div>

                </div>
              )
            )

          )}

        </div>

      </div>

      {/* ========================================= */}
      {/* IMAGE MODAL */}
      {/* ========================================= */}

      {selectedImage && (

        <div
          className="gallery-modal"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <div
            className="gallery-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-modal"
              onClick={() =>
                setSelectedImage(null)
              }
            >
              ✕
            </button>

            <img
              src={selectedImage.image_url}
              alt="Preview"
            />

          </div>

        </div>

      )}

    </section>
  );
}

export default Gallery;