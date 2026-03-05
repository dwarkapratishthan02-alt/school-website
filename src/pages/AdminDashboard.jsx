import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../config/supabase";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        navigate("/");
      }
    };

    checkAdmin();
  }, [navigate]);

  return (
    <div style={{ padding: "80px 0" }}>
      <div className="container">
        <h1>Admin Dashboard</h1>
        <p>Welcome Admin 👋</p>

        <ul style={{ marginTop: "20px", lineHeight: "2" }}>
          <li>
            <Link to="/admin/news">Manage News</Link>
          </li>

          <li>
            <Link to="/admin/students">Manage Students</Link>
          </li>

          <li>
            <Link to="/admin/admissions">Control Admissions Status</Link>
          </li>

          <li>
            <Link to="/">View Website</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;