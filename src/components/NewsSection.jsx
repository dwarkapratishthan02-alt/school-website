import "../styles/news.css";

function NewsSection() {
  return (
    <section className="news-section">
      <div className="container">

        <div className="section-header">
          <h2>News & Announcements</h2>
          <p>
            Stay updated with the latest events, announcements and academic activities.
          </p>
        </div>

        <div className="news-grid">

          {/* LEFT - Latest News */}
          <div className="latest-news">
            <h3>Latest News</h3>

            <div className="news-item">
              <span className="date">15 Jan 2026</span>
              <p>Annual Sports Day successfully conducted.</p>
            </div>

            <div className="news-item">
              <span className="date">05 Jan 2026</span>
              <p>Admissions open for Academic Year 2026-27.</p>
            </div>

            <div className="news-item">
              <span className="date">22 Dec 2025</span>
              <p>Defence Academy orientation program held.</p>
            </div>
          </div>

          {/* RIGHT - Upcoming Events */}
          <div className="upcoming-events">
            <h3>Upcoming Events</h3>

            <div className="event-item">
              <p><strong>Republic Day Celebration</strong></p>
              <span>26 Jan 2026</span>
            </div>

            <div className="event-item">
              <p><strong>Parent-Teacher Meeting</strong></p>
              <span>10 Feb 2026</span>
            </div>

            <div className="event-item">
              <p><strong>Board Exam Preparation Seminar</strong></p>
              <span>20 Feb 2026</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default NewsSection;