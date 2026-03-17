import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import "../../styles/attendance.css";

function Attendance() {

  const [records, setRecords] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentFound, setStudentFound] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {

    try {

      setLoading(true);

      // 🔥 Get session
      const { data: { session }, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error("No session found");
        setLoading(false);
        return;
      }

      const userEmail = session.user.email;

      // 🔥 Find student using email (IMPORTANT FIX)
      const { data: student, error: studentError } = await supabase
        .from("students")
        .select("id")
        .eq("email", userEmail)
        .single();

      if (studentError || !student) {
        console.warn("Student not found");
        setStudentFound(false);
        setRecords([]);
        return;
      }

      setStudentFound(true);

      // 🔥 Fetch attendance using correct student_id
      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("student_id", student.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Attendance fetch error:", error.message);
        setRecords([]);
        return;
      }

      if (data) {

        setRecords(data);

        const present = data.filter(
          (r) => r.status?.toLowerCase() === "present"
        ).length;

        const total = data.length;

        if (total > 0) {
          setPercentage(Math.round((present / total) * 100));
        } else {
          setPercentage(0);
        }

      }

    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }

  }

  function formatDate(date) {
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

          {loading ? (

            <div className="empty-box">
              Loading attendance...
            </div>

          ) : !studentFound ? (

            <div className="empty-box">
              Your student record was not found. Please contact admin.
            </div>

          ) : records.length === 0 ? (

            <div className="empty-box">
              No attendance records found.
            </div>

          ) : (

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