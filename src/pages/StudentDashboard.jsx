import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../config/supabase";
import "../styles/studentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStudent = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/student/login");
        return;
      }
    };

    const fetchNotices = async () => {
      const { data } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

      setNotices(data || []);
      setLoading(false);
    };

    checkStudent();
    fetchNotices();
  }, [navigate]);

  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <p className="dashboard-sub">Welcome back 👋</p>

        <div className="dashboard-cards">
          <Link to="/student/profile" className="dashboard-card">
            <h3>👤 Profile</h3>
            <p>View and update your profile</p>
          </Link>

          <div className="dashboard-card">
            <h3>📚 Study Material</h3>
            <p>Download study resources</p>
          </div>

          <div className="dashboard-card">
            <h3>📊 Attendance</h3>
            <p>Check your attendance</p>
          </div>

          <div className="dashboard-card">
            <h3>📝 Results</h3>
            <p>View your exam results</p>
          </div>
        </div>

        <div className="notices-section">
          <h2>Latest Notices</h2>

          {loading && <p>Loading notices...</p>}

          {!loading && notices.length === 0 && (
            <div className="notice-empty">No notices available.</div>
          )}

          {notices.map((notice) => (
            <div key={notice.id} className="notice-card">
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              <span>
                {new Date(notice.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;