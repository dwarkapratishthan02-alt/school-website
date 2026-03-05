import { useState } from "react";
import { supabase } from "../config/supabase";

function AdminNews() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from("news").insert([
      {
        title,
        content
      }
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("News published!");

    setTitle("");
    setContent("");
  }

  return (
    <div style={{ padding: "80px 0" }}>
      <div className="container">
        <h1>Publish News / Notice</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <input
            type="text"
            placeholder="News Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="News Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            required
          />

          <button type="submit">Publish</button>
        </form>
      </div>
    </div>
  );
}

export default AdminNews;