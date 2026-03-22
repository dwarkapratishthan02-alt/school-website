import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminGallery.css";

function AdminGallery() {

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Academics");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  // 🔥 LOAD IMAGES
  async function loadImages() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load error:", error);
    } else {
      setImages(data || []);
    }
  }

  // 🔥 UPLOAD IMAGE
  async function uploadImage(e) {
    e.preventDefault();

    if (!file) return alert("Please select a file");

    setLoading(true);

    const fileName = Date.now() + "-" + file.name;

    // 👉 1. Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Upload failed");
      setLoading(false);
      return;
    }

    // 👉 2. Get public URL
    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    // 👉 3. Save in DB (FIXED HERE ✅)
    const { error: dbError } = await supabase
      .from("gallery")
      .insert([
        {
          image_url: imageUrl, // ✅ FIXED
          category: category,
        },
      ]);

    if (dbError) {
      console.error(dbError);
      alert("Database error");
      setLoading(false);
      return;
    }

    // 👉 4. Reset + reload
    setFile(null);
    setLoading(false);
    loadImages();
  }

  // 🔥 DELETE IMAGE
  async function deleteImage(id, imageUrl) {

    if (!window.confirm("Delete this image?")) return;

    // 👉 delete from DB
    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Delete failed");
      return;
    }

    // 👉 OPTIONAL: delete from storage
    const fileName = imageUrl.split("/").pop();

    await supabase.storage
      .from("gallery")
      .remove([fileName]);

    loadImages();
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        <h1 className="page-title">Manage Gallery</h1>

        {/* Upload Card */}
        <div className="upload-card">

          <form onSubmit={uploadImage} className="upload-form">

            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Academics</option>
              <option>Events</option>
              <option>Sports</option>
              <option>Campus</option>
            </select>

            <label>Choose Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />

            <button type="submit" className="upload-btn">
              {loading ? "Uploading..." : "Upload Image"}
            </button>

          </form>

        </div>

        {/* Images Grid */}
        <h2 className="section-title">Gallery Images</h2>

        <div className="gallery-grid">

          {images.length === 0 ? (
            <p>No images uploaded yet.</p>
          ) : (
            images.map((img) => (
              <div key={img.id} className="gallery-card">

                {/* 🔥 FIXED FIELD */}
                <img src={img.image_url} alt="gallery" />

                <button
                  className="delete-btn"
                  onClick={() => deleteImage(img.id, img.image_url)}
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

export default AdminGallery;