import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import "../styles/adminDashboard.css";

import AdminSidebar from "../components/AdminSidebar";

import { FaNewspaper, FaUserGraduate } from "react-icons/fa";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    students: 0,
    notices: 0,
  });

  const [recentNotices, setRecentNotices] = useState([]);

  // 🔥 NEW STATE (Pending Students)
  const [pendingStudents, setPendingStudents] = useState([]);

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

    const loadData = async () => {

      const { count: studentCount } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true });

      const { count: noticeCount } = await supabase
        .from("notices")
        .select("*", { count: "exact", head: true });

      const { data: notices } = await supabase
        .from("notices")
        .select("id, title")
        .order("created_at", { ascending: false })
        .limit(5);

      // 🔥 FETCH PENDING STUDENTS
      const { data: pending } = await supabase
        .from("students")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      setStats({
        students: studentCount || 0,
        notices: noticeCount || 0,
      });

      setRecentNotices(notices || []);
      setPendingStudents(pending || []);
    };

    checkAdmin();
    loadData();

  }, [navigate]);

  // 🔥 APPROVE FUNCTION
  const approveStudent = async (id) => {
    await supabase
      .from("students")
      .update({ status: "approved" })
      .eq("id", id);

    alert("Student Approved ✅");

    // refresh list
    setPendingStudents(prev => prev.filter(s => s.id !== id));
  };

  // 🔥 REJECT FUNCTION
  const rejectStudent = async (id) => {
    await supabase
      .from("students")
      .update({ status: "rejected" })
      .eq("id", id);

    alert("Student Rejected ❌");

    setPendingStudents(prev => prev.filter(s => s.id !== id));
  };

  return (

    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Dashboard */}
      <div className="admin-dashboard">

        {/* Header */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>School Management</p>
        </div>


        {/* Stats Cards */}
        <div className="dashboard-cards">

          <div className="dashboard-card students">
            <div className="card-info">
              <h3>{stats.students}</h3>
              <p>Students</p>
            </div>
            <FaUserGraduate className="card-icon" />
          </div>

          <div className="dashboard-card notices">
            <div className="card-info">
              <h3>{stats.notices}</h3>
              <p>Notices</p>
            </div>
            <FaNewspaper className="card-icon" />
          </div>

        </div>


        {/* 🔥 NEW SECTION: Pending Students */}
        <div className="dashboard-box" style={{ marginTop: "30px" }}>
          <h3>Pending Student Approvals</h3>

          {pendingStudents.length === 0 ? (
            <p>No pending requests 🎉</p>
          ) : (
            <div className="pending-list">
              {pendingStudents.map((student) => (
                <div key={student.id} className="pending-item">

                  <div>
                    <strong>{student.name}</strong>
                    <p>{student.email}</p>
                    <small>Class: {student.class}</small>
                  </div>

                  <div className="pending-actions">
                    <button
                      className="approve-btn"
                      onClick={() => approveStudent(student.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => rejectStudent(student.id)}
                    >
                      Reject
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>


        {/* Dashboard Grid */}
        <div className="dashboard-grid">

          {/* Student Analytics Placeholder */}
          <div className="dashboard-box">
            <h3>Student Activity</h3>
            <p>Student analytics and activity charts will appear here.</p>
          </div>


          {/* Recent Notices */}
          <div className="dashboard-box">

            <h3>Recent Notices</h3>

            {recentNotices.length === 0 ? (
              <p>No notices available.</p>
            ) : (
              <ul className="recent-list">
                {recentNotices.map((notice) => (
                  <li key={notice.id}>
                    {notice.title}
                  </li>
                ))}
              </ul>
            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;