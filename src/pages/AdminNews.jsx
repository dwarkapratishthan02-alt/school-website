import { useState } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminNews.css";

function AdminNews() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function publishNews(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    let pdfUrl = null;

    try {

      // 🔥 Upload PDF if selected
      if (file) {

        const fileName = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("news-pdfs")
          .upload(fileName, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from("news-pdfs")
          .getPublicUrl(fileName);

        pdfUrl = data.publicUrl;
      }

      // 🔥 Insert into DB
      const { error } = await supabase
        .from("news")
        .insert([
          {
            title,
            content,
            pdf_url: pdfUrl
          }
        ]);

      if (error) {
        throw error;
      }

      // 🔥 Reset form
      setTitle("");
      setContent("");
      setFile(null);

      alert("News published successfully!");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        <h1 className="page-title">News & Announcements</h1>

        {/* 🔥 FIX: use notice-card (matches CSS) */}
        <div className="notice-card">

          <form onSubmit={publishNews} className="notice-form">

            <label>News Title</label>

            <input
              type="text"
              placeholder="Enter news title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>News Content</label>

            <textarea
              placeholder="Write announcement..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <label>Upload PDF (optional)</label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              type="submit"
              className="publish-btn"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish News"}
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default AdminNews;