import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/news.css";

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setNews(data);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="news-page">

      <div className="news-header">
        <h1>News & Announcements</h1>
        <p>Stay updated with the latest events and announcements.</p>
      </div>

      <div className="news-list">

        {news.map((item) => (
          <div className="news-card" key={item.id}>

            {/* LEFT PDF BOX */}

            <div className="pdf-box">
              {item.pdf_url ? (
                <a href={item.pdf_url} target="_blank" rel="noreferrer">
                  📄 View PDF
                </a>
              ) : (
                <span>No PDF</span>
              )}
            </div>

            {/* RIGHT CONTENT */}

            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <span className="news-date">
                {formatDate(item.created_at)}
              </span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default News;