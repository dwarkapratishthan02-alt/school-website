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

    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    setLoading(true);

    let pdfUrl = null;

    try {
      // =============================
      // 1. UPLOAD PDF (if exists)
      // =============================
      if (file) {

        const fileName = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("news-pdfs")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error("PDF upload failed");
        }

        // Get public URL
        const { data } = supabase.storage
          .from("news-pdfs")
          .getPublicUrl(fileName);

        pdfUrl = data.publicUrl;
      }

      // =============================
      // 2. INSERT INTO DATABASE
      // =============================
      const { error: dbError } = await supabase
        .from("news")
        .insert([
          {
            title: title,
            content: content,
            pdf_url: pdfUrl, // ✅ MUST MATCH DB COLUMN
          },
        ]);

      if (dbError) {
        console.error("DB error:", dbError);
        throw new Error("Database insert failed");
      }

      // =============================
      // 3. RESET FORM
      // =============================
      setTitle("");
      setContent("");
      setFile(null);

      alert("News published successfully!");

    } catch (err) {
      console.error("Full error:", err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        <h1 className="page-title">News & Announcements</h1>

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