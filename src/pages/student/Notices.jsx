import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import "../../styles/notices.css";

function Notices() {

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentClass, setStudentClass] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotices();
  }, []);

  async function loadNotices() {
    try {
      setLoading(true);
      setError(null);

      // 🔥 Get logged in user
      const { data: { user }, error: userError } =
        await supabase.auth.getUser();

      if (userError || !user) {
        setError("User not logged in");
        return;
      }

      let studentClassValue = null;

      // 🔥 Try profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("class")
        .eq("id", user.id)
        .single();

      if (profile && profile.class) {
        studentClassValue = profile.class;
      } else {

        // 🔥 Fallback: students table
        const { data: student } = await supabase
          .from("students")
          .select("class")
          .eq("email", user.email)
          .single();

        if (student && student.class) {
          studentClassValue = student.class;
        }
      }

      setStudentClass(studentClassValue);

      // 🔥 Fetch notices (class + general)
      let query = supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

      if (studentClassValue) {
        query = query.or(
          `class.eq.${studentClassValue},class.is.null`
        );
      }

      const { data, error: noticeError } = await query;

      if (noticeError) {
        setError("Failed to load notices");
        return;
      }

      setNotices(data || []);

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    if (!date) return "";
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
          <p>
            {studentClass
              ? `Showing notices for Class ${studentClass}`
              : "Stay updated with the latest announcements."}
          </p>
        </div>

        {/* 🔥 Loading */}
        {loading && (
          <div className="empty-box">
            Loading notices...
          </div>
        )}

        {/* 🔥 Error */}
        {!loading && error && (
          <div className="empty-box">
            {error}
          </div>
        )}

        {/* 🔥 No Data */}
        {!loading && !error && notices.length === 0 && (
          <div className="empty-box">
            No notices available.
          </div>
        )}

        {/* 🔥 Notices */}
        {!loading && !error && notices.length > 0 && (

          <div className="notice-list">

            {notices.map((notice) => (

              <div key={notice.id} className="notice-card">

                <div className="notice-date">
                  {formatDate(notice.created_at)}
                </div>

                <h3>{notice.title}</h3>

                <p>
                  {notice.description || "No details available"}
                </p>

                {/* 🔥 Show class badge */}
                {notice.class && (
                  <span className="notice-class">
                    Class {notice.class}
                  </span>
                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default Notices;