import { useState } from "react";
import "../styles/news.css";

function News() {
  const [news] = useState([
    {
      id: 1,
      title: "Admissions Starting Soon",
      content: "Admissions for 2026-27 will begin shortly."
    },
    {
      id: 2,
      title: "Annual Day Celebration",
      content: "Annual day will be held on 15th December."
    }
  ]);

  return (
    <div className="news-page">
      <div className="container">
        <h1 className="news-title">News & Announcements</h1>

        <div className="news-grid">
          {news.map((item) => (
            <div key={item.id} className="news-card">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;