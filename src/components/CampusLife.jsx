import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/campus.css";

function CampusLife() {

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchCampusImages();
  }, []);

  async function fetchCampusImages() {
    const { data, error } = await supabase
      .from("campus_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setImages(data);
    }
  }

  return (
    <section className="campus-life">
      <div className="container">

        <div className="section-header">
          <h2>Campus Life</h2>
          <p>
            Experience a vibrant learning environment enriched with academics,
            sports, cultural activities and disciplined growth.
          </p>
        </div>

        <div className="campus-grid">

          {images.length === 0 ? (
            <p className="no-images">No campus images available</p>
          ) : (
            images.map((img) => (
              <div className="campus-card" key={img.id}>
                <img src={img.image_url} alt="Campus" />
              </div>
            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default CampusLife;