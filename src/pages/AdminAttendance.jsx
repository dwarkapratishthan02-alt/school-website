import { useEffect, useState, useCallback } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminAttendance.css";

function AdminAttendance() {

  const today = new Date().toISOString().split("T")[0];

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // roll sort

  // LOAD STUDENTS
  const loadStudents = useCallback(async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*");

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

  // LOAD ATTENDANCE
  const loadExistingAttendance = useCallback(async () => {
    const { data, error } = await supabase
      .from("attendance")
      .select("student_id, status")
      .eq("date", today);

    if (error) {
      console.error(error);
      return;
    }

    const map = {};
    data.forEach((item) => {
      map[item.student_id] = item.status;
    });

    setAttendance(map);
  }, [today]);

  useEffect(() => {
    loadStudents();
    loadExistingAttendance();
  }, [loadStudents, loadExistingAttendance]);

  function markAttendance(studentId, status) {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status
    }));
  }

  // SAVE ATTENDANCE
  async function saveAttendance() {

    if (!selectedClass) {
      alert("Please select a class");
      return;
    }

    const records = Object.keys(attendance).map((studentId) => ({
      student_id: studentId,
      status: attendance[studentId],
      date: today
    }));

    if (records.length === 0) {
      alert("No attendance marked");
      return;
    }

    const { error } = await supabase
      .from("attendance")
      .upsert(records, {
        onConflict: ["student_id", "date"]
      });

    if (error) {
      console.error(error);
      alert("Error saving attendance");
      return;
    }

    alert("Attendance saved successfully!");
  }

  // 🔥 FILTER + SEARCH + SORT
  const filteredStudents = students
    .filter((s) => selectedClass === "" || s.class === selectedClass)
    .filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.roll_no || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return (a.roll_no || "").localeCompare(b.roll_no || "");
      } else {
        return (b.roll_no || "").localeCompare(a.roll_no || "");
      }
    });

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        <h1 className="page-title">Attendance Manager</h1>

        {/* FILTER */}
        <div className="attendance-header">

          {/* CLASS */}
          <div className="filter-group">
            <label>Class</label>
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

          {/* DATE */}
          <div className="filter-group">
            <label>Date</label>
            <input type="date" value={today} disabled />
          </div>

          {/* 🔥 SEARCH */}
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search name or roll no"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* 🔥 SORT */}
          <div className="filter-group">
            <label>Sort Roll No</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

        </div>

        {/* TABLE */}
        <div className="attendance-card">

          <div className="attendance-table">

            <div className="attendance-head">
              <span>Roll No</span>
              <span>Student Name</span>
              <span>Status</span>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="empty">
                No students found
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div key={student.id} className="attendance-row">

                  {/* 🔥 ROLL NO */}
                  <div>{student.roll_no}</div>

                  {/* NAME */}
                  <div className="student-name">
                    {student.name}
                  </div>

                  {/* STATUS */}
                  <div className="attendance-actions">

                    <button
                      className={`present-btn ${
                        attendance[student.id] === "present" ? "active" : ""
                      }`}
                      onClick={() =>
                        markAttendance(student.id, "present")
                      }
                    >
                      Present
                    </button>

                    <button
                      className={`absent-btn ${
                        attendance[student.id] === "absent" ? "active" : ""
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