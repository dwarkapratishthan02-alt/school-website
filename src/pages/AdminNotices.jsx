import { useState } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminNews.css";

function AdminNotices() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function createNotice(e) {
    e.preventDefault();

    const { error } = await supabase.from("notices").insert([
      {
        title,
        content,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Notice posted successfully");

    setTitle("");
    setContent("");
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        <h1 className="page-title">News & Announcements</h1>

        <div className="notice-card">

          <form className="notice-form" onSubmit={createNotice}>

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

            <button type="submit" className="publish-btn">
              Publish Notice
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AdminNotices;