import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/newsSection.css";

function NewsSection() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      console.log("Error loading news:", error);
      return;
    }

    console.log("News data:", data); // debugging

    setNews(data || []);
  }

  return (

    <section className="news-section">

      <div className="news-header">
        <h2>News & Announcements</h2>
        <p>Stay updated with the latest events and announcements.</p>
      </div>

      <div className="news-container">

        {news.length === 0 ? (

          <p className="no-news">No announcements available.</p>

        ) : (

          news.map((item) => (

            <div className="news-item" key={item.id}>

              {/* PDF PREVIEW */}

              <div className="pdf-preview">
                {item.pdf_url ? (
                  <a href={item.pdf_url} target="_blank" rel="noreferrer">
                    📄 View PDF
                  </a>
                ) : (
                  <span>No PDF</span>
                )}
              </div>

              {/* TEXT */}

              <div className="news-text">

                <h3>{item.title}</h3>

                <p>{item.content}</p>

                <span className="news-date">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  );
}

export default NewsSection;