import { useState } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminNews.css";

function AdminNews() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  async function publishNews(e) {

    e.preventDefault();

    let pdfUrl = null;

    // Upload PDF if selected
    if (file) {

      const fileName = Date.now() + "-" + file.name;

      const { error: uploadError } = await supabase.storage
        .from("news-pdfs")
        .upload(fileName, file);

      if (uploadError) {
        console.log(uploadError);
        alert("PDF upload failed");
        return;
      }

      // Get public URL of uploaded file
      const { data } = supabase.storage
        .from("news-pdfs")
        .getPublicUrl(fileName);

      pdfUrl = data.publicUrl;

    }

    // Insert news into database
    const { error } = await supabase
      .from("news")
      .insert([
        {
          title: title,
          content: content,
          pdf_url: pdfUrl
        }
      ]);

    if (error) {
      console.log(error);
      alert("Error publishing news");
      return;
    }

    setTitle("");
    setContent("");
    setFile(null);

    alert("News published successfully!");

  }

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        <h1 className="page-title">News & Announcements</h1>

        <div className="news-card">

          <form onSubmit={publishNews} className="news-form">

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

            <button type="submit" className="publish-btn">
              Publish News
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AdminNews;