import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/studentDashboard.css";

function StudentDashboard() {

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [notices, setNotices] = useState([]);

  const [attendancePercent, setAttendancePercent] = useState(0);
  const [latestResult, setLatestResult] = useState(null);
  const [materialsCount, setMaterialsCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDashboard();
  }, []);

  async function initDashboard() {
    try {

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      const email = session.user.email;

      // 🔥 Get student
      const { data: studentData } = await supabase
        .from("students")
        .select("*")
        .eq("email", email)
        .single();

      if (!studentData) {
        setLoading(false);
        return;
      }

      setStudent(studentData);

      // 🔥 Load everything in parallel
      await Promise.all([
        fetchAttendance(studentData.id),
        fetchResults(studentData.id),
        fetchMaterials(studentData.class),
        fetchNotices()
      ]);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAttendance(studentId) {

    const { data } = await supabase
      .from("attendance")
      .select("status")
      .eq("student_id", studentId);

    if (data && data.length > 0) {

      const present = data.filter(
        (r) => r.status?.toLowerCase() === "present"
      ).length;

      const percent = Math.round((present / data.length) * 100);

      setAttendancePercent(percent);
    }
  }

  async function fetchResults(studentId) {

    const { data } = await supabase
      .from("results")
      .select("*")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      setLatestResult(data[0]);
    }
  }

  async function fetchMaterials(studentClass) {

    const { data } = await supabase
      .from("study_materials")
      .select("id")
      .eq("class", studentClass);

    if (data) {
      setMaterialsCount(data.length);
    }
  }

  async function fetchNotices() {

    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    setNotices(data || []);
  }

  if (loading) {
    return (
      <section className="student-dashboard">
        <div className="container">
          <p>Loading dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="student-dashboard">

      <div className="container">

        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>
            Welcome back {student?.name || ""} 👋
          </p>
        </div>

        {/* 🔥 STATS CARDS */}

        <div className="dashboard-stats">

          <div className="stat-card">
            <h2>{attendancePercent}%</h2>
            <p>Attendance</p>
          </div>

          <div className="stat-card">
            <h2>{materialsCount}</h2>
            <p>Materials</p>
          </div>

          <div className="stat-card">
            <h2>{latestResult ? "Available" : "—"}</h2>
            <p>Latest Result</p>
          </div>

        </div>

        {/* ACTION CARDS */}

        <div className="dashboard-grid">

          <div
            className="dashboard-card"
            onClick={() => navigate("/student/profile")}
          >
            👤 Profile
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/student/study-material")}
          >
            📚 Study Material
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/student/attendance")}
          >
            📊 Attendance
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/student/results")}
          >
            📝 Results
          </div>

        </div>

        {/* NOTICES */}

        <div className="dashboard-notices">

          <h2>Latest Notices</h2>

          {notices.length === 0 ? (
            <p>No notices available</p>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className="notice-item">
                <h4>{notice.title}</h4>
                <p>{notice.description}</p>
              </div>
            ))
          )}

          <div
            className="notice-card"
            onClick={() => navigate("/student/notices")}
          >
            View all notices
          </div>

        </div>

      </div>

    </section>
  );
}

export default StudentDashboard;