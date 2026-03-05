import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../config/supabase";

function StudentDashboard() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStudent();
    fetchNotices();
  }, []);

  async function checkStudent() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/student/login");
    }
  }

  async function fetchNotices() {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotices(data);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "80px 0" }}>
      <div className="container">
        <h1>Student Dashboard</h1>
        <p>Welcome Student 👋</p>

        {/* Student actions */}
        <ul style={{ marginTop: "20px", lineHeight: "2" }}>
          <li>
            <Link to="/student/profile">View / Edit Profile</Link>
          </li>
          <li>Download Study Material</li>
          <li>Check Attendance</li>
          <li>View Results</li>
        </ul>

        {/* Notices */}
        <div style={{ marginTop: "40px" }}>
          <h2>Latest Notices</h2>

          {loading && <p>Loading notices...</p>}

          {!loading && notices.length === 0 && (
            <p>No notices available.</p>
          )}

          {notices.map((notice) => (
            <div
              key={notice.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "6px",
              }}
            >
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              <small>
                {new Date(notice.created_at).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;