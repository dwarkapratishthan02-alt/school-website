import { useEffect, useState, useCallback } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminAttendance.css";

function AdminAttendance() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // ✅ LOAD STUDENTS (FIXED)
  const loadStudents = useCallback(async () => {

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setStudents(data || []);

    const uniqueClasses = [
      ...new Set(data.map((s) => s.class).filter(Boolean))
    ];
    setClasses(uniqueClasses);

  }, []);

  // ✅ LOAD EXISTING ATTENDANCE (FIXED)
  const loadExistingAttendance = useCallback(async () => {

    const { data, error } = await supabase
      .from("attendance")
      .select("student_id, status")
      .eq("date", date);

    if (error) {
      console.error(error);
      return;
    }

    const map = {};
    data.forEach((item) => {
      map[item.student_id] = item.status;
    });

    setAttendance(map);

  }, [date]);

  // ✅ EFFECTS (FIXED DEPENDENCIES)
  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  useEffect(() => {
    if (selectedClass && date) {
      loadExistingAttendance();
    }
  }, [selectedClass, date, loadExistingAttendance]);

  function markAttendance(studentId, status) {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status
    }));
  }

  async function saveAttendance() {

    if (!selectedClass) {
      alert("Please select a class");
      return;
    }

    const records = Object.keys(attendance).map((studentId) => ({
      student_id: studentId,
      status: attendance[studentId],
      date: date
    }));

    if (records.length === 0) {
      alert("No attendance marked");
      return;
    }

    // 🔥 Delete old attendance
    await supabase
      .from("attendance")
      .delete()
      .eq("date", date);

    // 🔥 Insert new attendance
    const { error } = await supabase
      .from("attendance")
      .insert(records);

    if (error) {
      alert("Error saving attendance");
      return;
    }

    alert("Attendance saved successfully!");
  }

  const filteredStudents = students.filter((s) =>
    selectedClass === "" || s.class === selectedClass
  );

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        <h1 className="page-title">Attendance Manager</h1>

        <div className="attendance-header">

          <div>
            <label>Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setAttendance({});
              }}
            >
              <option value="">Select Class</option>
              {classes.map((cls, index) => (
                <option key={index} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

        </div>

        <div className="attendance-card">

          <div className="attendance-table">

            <div className="attendance-head">
              <span>Student</span>
              <span>Present</span>
              <span>Absent</span>
            </div>

            {filteredStudents.length === 0 ? (

              <div className="empty">
                No students found for this class
              </div>

            ) : (

              filteredStudents.map((student) => (

                <div key={student.id} className="attendance-row">

                  <div className="student-name">
                    {student.name}
                  </div>

                  <div>
                    <button
                      className={`present-btn ${
                        attendance[student.id] === "present"
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        markAttendance(student.id, "present")
                      }
                    >
                      Present
                    </button>
                  </div>

                  <div>
                    <button
                      className={`absent-btn ${
                        attendance[student.id] === "absent"
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        markAttendance(student.id, "absent")
                      }
                    >
                      Absent
                    </button>
                  </div>

                </div>

              ))

            )}

          </div>

          <button
            className="save-attendance-btn"
            onClick={saveAttendance}
          >
            Save Attendance
          </button>

        </div>

      </div>

    </div>

  );

}

export default AdminAttendance;