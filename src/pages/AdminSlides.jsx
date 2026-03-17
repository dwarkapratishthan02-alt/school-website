import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminSlides.css";

function AdminSlides() {

  const [files, setFiles] = useState([]);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    loadSlides();
  }, []);

  async function loadSlides() {

    const { data } = await supabase
      .from("sliders")
      .select("*")
      .order("created_at", { ascending: false });

    setSlides(data || []);

  }

  async function uploadSlide(e) {

    e.preventDefault();

    if (!files.length) return;

    for (const file of files) {

      const fileName =
        Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.]/g, "_");

      const { error } = await supabase.storage
        .from("slider-images")
        .upload(fileName, file);

      if (error) {
        console.log(error);
        continue;
      }

      const { data } = supabase.storage
        .from("slider-images")
        .getPublicUrl(fileName);

      const imageUrl = data.publicUrl;

      await supabase.from("sliders").insert({
        image_url: imageUrl
      });

    }

    setFiles([]);
    loadSlides();
  }

  async function deleteSlide(id) {

    if (!window.confirm("Delete this slide?")) return;

    await supabase
      .from("sliders")
      .delete()
      .eq("id", id);

    loadSlides();

  }

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        <h1 className="page-title">Manage Hero Slides</h1>

        <div className="upload-card">

          <form onSubmit={uploadSlide} className="upload-form">

            <label>Upload Slides</label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              required
            />

            <button type="submit" className="upload-btn">
              Upload Slides
            </button>

          </form>

        </div>

        <h2 className="section-title">Current Slides</h2>

        <div className="slides-grid">

          {slides.length === 0 ? (

            <p>No slides uploaded yet.</p>

          ) : (

            slides.map((slide) => (

              <div key={slide.id} className="slide-card">

                <img src={slide.image_url} alt="slide" />

                <button
                  className="delete-btn"
                  onClick={() => deleteSlide(slide.id)}
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}

export default AdminSlides;