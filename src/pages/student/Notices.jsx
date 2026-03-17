import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import "../../styles/notices.css";

function Notices() {

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotices();
  }, []);

  async function loadNotices() {

    try {

      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Notice fetch error:", error);
        return;
      }

      setNotices(data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  return (
    <section className="student-notices">

      <div className="container">

        <div className="page-header">
          <h1>School Notices</h1>
          <p>Stay updated with the latest announcements.</p>
        </div>


        {loading ? (

          <div className="empty-box">
            Loading notices...
          </div>

        ) : notices.length === 0 ? (

          <div className="empty-box">
            No notices available.
          </div>

        ) : (

          <div className="notice-list">

            {notices.map((notice) => (

              <div key={notice.id} className="notice-card">

                <div className="notice-date">
                  {formatDate(notice.created_at)}
                </div>

                <h3>{notice.title}</h3>

                <p>
                  {notice.description}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default Notices;