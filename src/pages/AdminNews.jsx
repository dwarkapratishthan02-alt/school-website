import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminNews.css";

function AdminNews() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newsList, setNewsList] = useState([]);
  const [fetching, setFetching] = useState(true);

  // =============================
  // FETCH NEWS
  // =============================
  async function fetchNews() {
    setFetching(true);

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Failed to fetch news");
    } else {
      setNewsList(data);
    }

    setFetching(false);
  }

  useEffect(() => {
    fetchNews();
  }, []);

  // =============================
  // PUBLISH NEWS
  // =============================
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
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("news-pdfs")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("news-pdfs")
          .getPublicUrl(fileName);

        pdfUrl = data.publicUrl;
      }

      const { error: dbError } = await supabase
        .from("news")
        .insert([{ title, content, pdf_url: pdfUrl }]);

      if (dbError) throw dbError;

      setTitle("");
      setContent("");
      setFile(null);

      alert("News published!");

      fetchNews();

    } catch (err) {
      console.error(err);
      alert("Error publishing news");
    } finally {
      setLoading(false);
    }
  }

  // =============================
  // DELETE NEWS (🔥 FIXED)
  // =============================
  async function deleteNews(item) {
    const confirmDelete = window.confirm("Delete this notice?");
    if (!confirmDelete) return;

    try {
      console.log("Deleting:", item.id);

      // 🔥 DELETE FROM DB WITH RETURN
      const { data, error } = await supabase
        .from("news")
        .delete()
        .eq("id", item.id)
        .select();

      if (error) {
        console.error("Delete error:", error);
        alert("Delete failed");
        return;
      }

      // 🔥 CHECK IF ACTUALLY DELETED
      if (!data || data.length === 0) {
        alert("Nothing deleted! Check RLS or ID");
        return;
      }

      // 🔥 DELETE FILE FROM STORAGE
      if (item.pdf_url) {
        const filePath = item.pdf_url.split("/news-pdfs/")[1];

        if (filePath) {
          await supabase.storage
            .from("news-pdfs")
            .remove([filePath]);
        }
      }

      // 🔥 REMOVE FROM UI INSTANTLY
      setNewsList((prev) => prev.filter(n => n.id !== item.id));

      alert("Deleted successfully");

    } catch (err) {
      console.error(err);
      alert("Error deleting");
    }
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        <h1 className="page-title">News & Announcements</h1>

        {/* FORM */}
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

        {/* LIST */}
        <div className="notice-list">

          <h2>All Notices</h2>

          {fetching ? (
            <p>Loading...</p>
          ) : newsList.length === 0 ? (
            <p>No notices yet</p>
          ) : (
            newsList.map((item) => (
              <div key={item.id} className="notice-item">

                <div className="content">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>

                  {item.pdf_url && (
                    <a
                      href={item.pdf_url}
                      target="_blank"
                      rel="noreferrer"
                      className="pdf-link"
                    >
                      View PDF
                    </a>
                  )}
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteNews(item)}
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

export default AdminNews;