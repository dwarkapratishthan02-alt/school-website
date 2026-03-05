import { useState } from "react";
import { supabase } from "../config/supabase";

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
    <div style={{ padding: "80px 0" }}>
      <div className="container">
        <h1>Post Notice</h1>

        <form
          onSubmit={createNotice}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "500px",
          }}
        >
          <input
            placeholder="Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Notice Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button type="submit">Post Notice</button>
        </form>
      </div>
    </div>
  );
}

export default AdminNotices;