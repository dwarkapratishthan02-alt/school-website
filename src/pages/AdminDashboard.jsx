import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
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
  }

  return (
    <div style={{ padding: "80px 0" }}>
      <div className="container">
        <h1>Admin Dashboard</h1>
        <p>Welcome Admin 👋</p>

        <ul>
          <li>Manage Hero Slides</li>
          <li>Manage News</li>
          <li>Control Admissions Status</li>
          <li>Manage Students</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;