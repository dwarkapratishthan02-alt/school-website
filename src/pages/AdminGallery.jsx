import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminGallery.css";

function AdminGallery() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Slides"); // 🔥 DEFAULT FIXED
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

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // ✅ 1. Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // ✅ 2. Get PUBLIC URL
      const { data: publicUrlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // ✅ 3. Save in DB
      const { error: dbError } = await supabase.from("gallery").insert([
        {
          image_url: imageUrl,
          category: category,
        },
      ]);

      if (dbError) throw dbError;

      alert("Image uploaded successfully!");

      // reset
      setFile(null);
      loadImages();

    } catch (err) {
      console.error("Upload Error:", err);
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  // 🔥 DELETE IMAGE
  async function deleteImage(id, imageUrl) {
    if (!window.confirm("Delete this image?")) return;

    try {
      // ✅ 1. Delete from DB
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // ✅ 2. Delete from storage
      const filePath = imageUrl.split("/storage/v1/object/public/gallery/")[1];

      if (filePath) {
        await supabase.storage
          .from("gallery")
          .remove([filePath]);
      }

      loadImages();

    } catch (err) {
      console.error("Delete Error:", err);
      alert("Delete failed");
    }
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
              {/* 🔥 IMPORTANT: SAME AS FRONTEND */}
              <option>Slides</option>
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

                <img src={img.image_url} alt="gallery" />

                <p className="category-tag">{img.category}</p>

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