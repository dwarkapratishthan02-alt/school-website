import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../config/supabase";
import "../styles/adminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ students: 0, notices: 0 });

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!profile || profile.role !== "admin") {
        navigate("/");
      }
    };

    const loadStats = async () => {
      const { count: studentCount } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true });

      const { count: noticeCount } = await supabase
        .from("notices")
        .select("*", { count: "exact", head: true });

      setStats({
        students: studentCount || 0,
        notices: noticeCount || 0,
      });
    };

    checkAdmin();
    loadStats();
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-sub">Manage your school portal</p>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{stats.students}</p>
          </div>

          <div className="stat-card">
            <h3>Total Notices</h3>
            <p>{stats.notices}</p>
          </div>
        </div>

        <div className="admin-actions">
          <Link to="/admin/news" className="admin-action">
            📰 Manage Notices
          </Link>

          <Link to="/admin/students" className="admin-action">
            👨‍🎓 Manage Students
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;