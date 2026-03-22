import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import "../../styles/attendance.css";

function Attendance() {

  const [records, setRecords] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentFound, setStudentFound] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {

    try {
      setLoading(true);
      setError(null);

      // 🔥 Get logged-in user
      const { data: { user }, error: userError } =
        await supabase.auth.getUser();

      if (userError || !user) {
        setError("User not logged in");
        return;
      }

      let studentId = null;

      // 🔥 Try profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (profile) {
        studentId = profile.id;
      } else {

        // 🔥 Fallback: students table (your case)
        const { data: student } = await supabase
          .from("students")
          .select("id")
          .eq("email", user.email)
          .single();

        if (student) {
          studentId = student.id;
        }
      }

      if (!studentId) {
        setStudentFound(false);
        return;
      }

      setStudentFound(true);

      // 🔥 Fetch attendance
      const { data, error: attendanceError } = await supabase
        .from("attendance")
        .select("*")
        .eq("student_id", studentId)
        .order("date", { ascending: false });

      if (attendanceError) {
        setError("Failed to load attendance");
        return;
      }

      if (data && data.length > 0) {

        setRecords(data);

        const present = data.filter(
          (r) => r.status?.toLowerCase() === "present"
        ).length;

        const total = data.length;

        const percent = Math.round((present / total) * 100);
        setPercentage(percent);

      } else {
        setRecords([]);
        setPercentage(0);
      }

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
    <section className="attendance-page">

      <div className="container">

        <div className="page-header">
          <h1>Attendance</h1>
          <p>Track your attendance and academic participation.</p>
        </div>

        {/* 🔥 SUMMARY CARD */}
        <div className="attendance-summary">

          <div className="attendance-card">
            <h2>{percentage}%</h2>
            <p>Attendance Percentage</p>
          </div>

        </div>

        {/* 🔥 TABLE */}
        <div className="attendance-table">

          {/* Loading */}
          {loading && (
            <div className="empty-box">
              Loading attendance...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="empty-box">
              {error}
            </div>
          )}

          {/* Student not found */}
          {!loading && !error && !studentFound && (
            <div className="empty-box">
              Your student record was not found. Please contact admin.
            </div>
          )}

          {/* No records */}
          {!loading && !error && studentFound && records.length === 0 && (
            <div className="empty-box">
              No attendance records found.
            </div>
          )}

          {/* Table */}
          {!loading && !error && studentFound && records.length > 0 && (

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {records.map((item) => (

                  <tr key={item.id}>

                    <td>{formatDate(item.date)}</td>

                    <td>{item.subject || "-"}</td>

                    <td
                      className={
                        item.status?.toLowerCase() === "present"
                          ? "present"
                          : "absent"
                      }
                    >
                      {item.status}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </section>
  );
}

export default Attendance;