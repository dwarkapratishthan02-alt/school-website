import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setStudents(data);
    }

    setLoading(false);
  }

  async function deleteStudent(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchStudents();
    }
  }

  if (loading) return <p style={{ padding: "80px" }}>Loading students...</p>;

  return (
    <div style={{ padding: "80px 0" }}>
      <div className="container">
        <h1>Manage Students</h1>

        <table style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Class</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.roll}</td>
                <td>{student.class}</td>
                <td>{student.email}</td>

                <td>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminStudents;