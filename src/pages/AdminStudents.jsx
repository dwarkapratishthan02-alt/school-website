import { useEffect, useState, useCallback } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminStudents.css";

function AdminStudents() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [email, setEmail] = useState("");

  // ✅ LOAD STUDENTS (FIXED WITH useCallback)
  const loadStudents = useCallback(async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading students:", error.message);
      return;
    }

    setStudents(data || []);

    const uniqueClasses = [
      ...new Set(data.map((s) => s.class).filter(Boolean)),
    ];
    setClasses(uniqueClasses);

  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // ✅ ADD STUDENT
  async function addStudent(e) {
    e.preventDefault();

    const { error } = await supabase.from("students").insert([
      {
        name,
        roll,
        class: studentClass,
        email,
      },
    ]);

    if (error) {
      alert("Error adding student: " + error.message);
      return;
    }

    alert("Student added successfully!");

    setName("");
    setRoll("");
    setStudentClass("");
    setEmail("");
    setShowModal(false);

    loadStudents();
  }

  // ✅ DELETE
  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) return;

    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting student");
      return;
    }

    loadStudents();
  }

  // ✅ FILTER
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.roll?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase());

    const matchesClass =
      selectedClass === "" || s.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        {/* HEADER */}
        <div className="page-header">
          <h1>Manage Students</h1>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Student
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className="search-container">

          <input
            type="text"
            placeholder="Search by name, roll, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>
                {cls}
              </option>
            ))}
          </select>

        </div>

        {/* TABLE */}
        <div className="table-card">

          <table className="students-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Roll</th>
                <th>Class</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">
                    No students found
                  </td>
                </tr>
              ) : (

                filteredStudents.map((student) => (

                  <tr key={student.id}>

                    <td className="student-cell" data-label="Student">
                      <div className="avatar">
                        {student.name?.charAt(0)}
                      </div>
                      {student.name}
                    </td>

                    <td data-label="Roll">{student.roll}</td>

                    <td data-label="Class">{student.class}</td>

                    <td data-label="Email">{student.email}</td>

                    <td data-label="Action">
                      <button
                        className="delete-btn"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="modal">

          <div className="modal-content">

            <h2>Add Student</h2>

            <form onSubmit={addStudent}>

              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Roll Number"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Class"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit" className="save-btn">
                Save Student
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminStudents;