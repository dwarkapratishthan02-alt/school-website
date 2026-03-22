import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../config/supabase";
import "../styles/studentDashboard.css";

import { FaUser, FaBook } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [notices, setNotices] = useState([]);

  const [attendancePercent, setAttendancePercent] = useState(0);
  const [latestResult, setLatestResult] = useState(null);
  const [materialsCount, setMaterialsCount] = useState(0);

  const [loading, setLoading] = useState(true);

  // 🔥 FETCH ATTENDANCE
  const fetchAttendance = useCallback(async (studentId) => {
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
    } else {
      setAttendancePercent(0);
    }
  }, []);

  // 🔥 FETCH RESULTS
  const fetchResults = useCallback(async (studentId) => {
    const { data } = await supabase
      .from("results")
      .select("*")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false })
      .limit(1);

    setLatestResult(data?.[0] || null);
  }, []);

  // 🔥 FETCH MATERIALS
  const fetchMaterials = useCallback(async (studentClass) => {
    const { data } = await supabase
      .from("study_materials")
      .select("id")
      .eq("class", studentClass);

    setMaterialsCount(data?.length || 0);
  }, []);

  // 🔥 FETCH NOTICES
  const fetchNotices = useCallback(async () => {
    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    setNotices(data || []);
  }, []);

  // 🔥 INIT
  const initDashboard = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/student/login");
      return;
    }

    const email = session.user.email;

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

    await Promise.all([
      fetchAttendance(studentData.id),
      fetchResults(studentData.id),
      fetchMaterials(studentData.class),
      fetchNotices(),
    ]);

    setLoading(false);
  }, [fetchAttendance, fetchResults, fetchMaterials, fetchNotices, navigate]);

  useEffect(() => {
    initDashboard();
  }, [initDashboard]);

  if (loading) {
    return (
      <section className="student-dashboard">
        <div className="container">
          <p>Loading dashboard...</p>
        </div>
      </section>
    );
  }

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

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Welcome back {student.name} 👋</p>
        </div>

        {/* 🔥 HERO CARD */}
        <div className="dashboard-hero">
          <h2>{attendancePercent}%</h2>
          <p>Attendance</p>
        </div>

        {/* 🔥 MAIN CARDS */}
        <div className="dashboard-grid">

          <div
            className="dashboard-card"
            onClick={() => navigate("/student/study-material")}
          >
            <div className="card-icon blue">
              <FaBook />
            </div>
            <div>
              <h3>{materialsCount}</h3>
              <p>Study Materials</p>
            </div>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/student/results")}
          >
            <div className="card-icon purple">
              <HiDocumentReport />
            </div>
            <div>
              <h3>{latestResult ? "Available" : "--"}</h3>
              <p>Latest Result</p>
            </div>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/student/profile")}
          >
            <div className="card-icon green">
              <FaUser />
            </div>
            <div>
              <h3>{student.name}</h3>
              <p>Profile</p>
            </div>
          </div>

        </div>

        {/* 🔥 NOTICES */}
        <div className="dashboard-notices">
          <h2>Latest Notices</h2>

          {notices.length === 0 ? (
            <div className="notice-card">
              No notices available
            </div>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className="notice-card">
                <strong>{notice.title}</strong>
                <p>{notice.description}</p>
              </div>
            ))
          )}

          <div
            className="notice-card view-all"
            onClick={() => navigate("/student/notices")}
          >
            View all notices →
          </div>
        </div>

      </div>
    </section>
  );
}

export default StudentDashboard;