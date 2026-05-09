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

    console.log("News data:", data);

    setNews(data || []);
  }

  return (

    <section className="news-section">

      {/* TOP HEADER */}

      <div className="news-top">

        <div className="news-badge">
          Latest Updates
        </div>

        <h2>
          News & Announcements
        </h2>

        <p>
          Stay updated with important notices, events,
          achievements, and latest announcements from
          Dwarka Pratishthan.
        </p>

      </div>

      {/* NEWS GRID */}

      <div className="news-grid">

        {news.length === 0 ? (

          <div className="no-news-card">
            <h3>No Announcements Yet</h3>
            <p>
              Latest school updates and notices will
              appear here soon.
            </p>
          </div>

        ) : (

          news.map((item, index) => (

            <div className="news-card" key={item.id}>

              {/* TOP */}

              <div className="news-card-top">

                <div className="news-number">
                  0{index + 1}
                </div>

                <div className="news-date">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>

              </div>

              {/* TITLE */}

              <h3>{item.title}</h3>

              {/* CONTENT */}

              <p>
                {item.content}
              </p>

              {/* FOOTER */}

              <div className="news-footer">

                {item.pdf_url ? (

                  <a
                    href={item.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="pdf-btn"
                  >
                    📄 View Notice
                  </a>

                ) : (

                  <span className="no-pdf">
                    No Attachment
                  </span>

                )}

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  );
}

export default NewsSection;