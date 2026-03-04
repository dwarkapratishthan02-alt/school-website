import { useState } from "react";
import "../styles/adminNews.css";

function AdminNews() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [news, setNews] = useState([]);

  function addNews() {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      title,
      content
    };

    setNews([newItem, ...news]);
    setTitle("");
    setContent("");
  }

  function deleteNews(id) {
    setNews(news.filter((item) => item.id !== id));
  }

  return (
    <div className="admin-news-page">
      <div className="container">
        <h1>Admin - Manage News</h1>

        <div className="admin-form">
          <input
            type="text"
            placeholder="Enter News Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter News Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={addNews}>
            Add News
          </button>
        </div>

        <div className="admin-news-list">
          {news.map((item) => (
            <div key={item.id} className="admin-news-card">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <button onClick={() => deleteNews(item.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminNews;