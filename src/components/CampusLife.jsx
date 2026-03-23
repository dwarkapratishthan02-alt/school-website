import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/campus.css";

function CampusLife() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampusImages();
  }, []);

  // 🔥 FETCH FROM GALLERY TABLE (FILTER BY CATEGORY)
  async function fetchCampusImages() {
    try {
      const { data, error } = await supabase
        .from("gallery") // ✅ FIXED TABLE
        .select("*")
        .eq("category", "Campus") // ✅ FILTER
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log("Campus Images:", data); // debug

      setImages(data || []);

    } catch (err) {
      console.error("Campus Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="campus-life">
      <div className="container">

        {/* HEADER */}
        <div className="section-header">
          <h2>Campus Life</h2>
          <p>
            Experience a vibrant learning environment enriched with academics,
            sports, cultural activities and disciplined growth.
          </p>
        </div>

        {/* GRID */}
        <div className="campus-grid">

          {loading ? (
            <p className="no-images">Loading images...</p>

          ) : images.length === 0 ? (
            <p className="no-images">No campus images available</p>

          ) : (
            images.map((img) => (
              <div className="campus-card" key={img.id}>

                <img
                  src={img.image_url}
                  alt={img.category || "Campus"}
                  onError={(e) => {
                    e.target.src = "/images/fallback.jpg"; // ✅ local fallback
                  }}
                />

              </div>
            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default CampusLife;