import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
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

  // ✅ FETCH ATTENDANCE
  const fetchAttendance = useCallback(async (studentId) => {
    try {
      const { data, error } = await supabase
        .from("attendance")
        .select("status")
        .eq("student_id", studentId);

      if (error) throw error;

      if (data && data.length > 0) {
        const present = data.filter(
          (r) => r.status?.toLowerCase() === "present"
        ).length;

        const percent = Math.round((present / data.length) * 100);
        setAttendancePercent(percent);
      } else {
        setAttendancePercent(0);
      }
    } catch (err) {
      console.error("Attendance Error:", err);
    }
  }, []);

  // ✅ FETCH RESULTS
  const fetchResults = useCallback(async (studentId) => {
    try {
      const { data, error } = await supabase
        .from("results")
        .select("*")
        .eq("student_id", studentId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setLatestResult(data[0]);
      } else {
        setLatestResult(null);
      }
    } catch (err) {
      console.error("Results Error:", err);
    }
  }, []);

  // ✅ FETCH MATERIALS
  const fetchMaterials = useCallback(async (studentClass) => {
    try {
      const { data, error } = await supabase
        .from("study_materials")
        .select("id")
        .eq("class", studentClass);

      if (error) throw error;

      setMaterialsCount(data?.length || 0);
    } catch (err) {
      console.error("Materials Error:", err);
    }
  }, []);

  // ✅ FETCH NOTICES
  const fetchNotices = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      setNotices(data || []);
    } catch (err) {
      console.error("Notices Error:", err);
    }
  }, []);

  // ✅ INIT DASHBOARD
  const initDashboard = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      const email = session.user.email;

      const { data: studentData, error } = await supabase
        .from("students")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !studentData) {
        setLoading(false);
        return;
      }

      setStudent(studentData);

      await Promise.all([
        fetchAttendance(studentData.id),
        fetchResults(studentData.id),
        fetchMaterials(studentData.class),
        fetchNotices(),
      ]);
    } catch (err) {
      console.error("Dashboard Init Error:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchAttendance, fetchResults, fetchMaterials, fetchNotices]);

  // ✅ EFFECT
  useEffect(() => {
    initDashboard();
  }, [initDashboard]);

  // ✅ LOADING UI
  if (loading) {
    return (
      <section className="student-dashboard">
        <div className="container">
          <p>Loading dashboard...</p>
        </div>
      </section>
    );
  }

  // ❗ SAFETY (no student found)
  if (!student) {
    return (
      <section className="student-dashboard">
        <div className="container">
          <p>No student data found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="student-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Welcome back {student.name} 👋</p>
        </div>

        {/* STATS */}
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

        {/* ACTIONS */}
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