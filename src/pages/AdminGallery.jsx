import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminGallery.css";

function AdminGallery() {

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Academics");
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {

    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    setImages(data || []);
  }

  async function uploadImage(e) {

    e.preventDefault();

    if (!file) return;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (!error) {

      const imageUrl =
        supabase.storage.from("gallery").getPublicUrl(fileName).data.publicUrl;

      await supabase.from("gallery").insert({
        image: imageUrl,
        category: category
      });

      setFile(null);
      loadImages();
    }

  }

  async function deleteImage(id) {

    if (!window.confirm("Delete this image?")) return;

    await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

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
              Upload Image
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

                <img src={img.image} alt="gallery" />

                <button
                  className="delete-btn"
                  onClick={() => deleteImage(img.id)}
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