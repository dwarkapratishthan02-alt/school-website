import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminResults.css";

function AdminResults() {

  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudents();
    loadResults();
  }, []);

  async function loadStudents() {

    const { data, error } = await supabase
      .from("students")
      .select("id, name, class")
      .order("name");

    if (!error && data) {
      setStudents(data);

      const uniqueClasses = [...new Set(data.map((s) => s.class).filter(Boolean))];
      setClasses(uniqueClasses);
    }
  }

  async function loadResults() {

    const { data, error } = await supabase
      .from("results")
      .select(`
        id,
        result_pdf,
        created_at,
        students(name, class)
      `)
      .order("created_at", { ascending: false });

    if (!error && data) setResults(data);
  }

  // 🔥 SEARCH LOGIC
  useEffect(() => {

    if (search === "") {
      setFilteredStudents([]);
      return;
    }

    const result = students.filter((s) =>
      (selectedClass === "" || s.class === selectedClass) &&
      (
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.class || "").toLowerCase().includes(search.toLowerCase())
      )
    );

    setFilteredStudents(result);

  }, [search, students, selectedClass]);

  function handleSelectStudent(student) {
    setSelectedStudent(student);
    setSearch(student.name);
    setFilteredStudents([]);
  }

  async function handleUpload(e) {

    e.preventDefault();

    if (!selectedStudent || !file) {
      alert("Select student and upload PDF");
      return;
    }

    setLoading(true);

    try {

      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("results")
        .upload(fileName, file);

      if (uploadError) {
        alert("Upload failed");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("results")
        .getPublicUrl(fileName);

      const fileUrl = data.publicUrl;

      const { error } = await supabase
        .from("results")
        .insert([
          {
            student_id: selectedStudent.id,
            result_pdf: fileUrl
          }
        ]);

      if (!error) {
        alert("Result uploaded successfully!");
        setSelectedStudent(null);
        setSearch("");
        setFile(null);
        loadResults();
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteResult(id) {

    if (!window.confirm("Delete this result?")) return;

    const { error } = await supabase
      .from("results")
      .delete()
      .eq("id", id);

    if (!error) loadResults();
  }

  const filteredResults = results.filter((r) =>
    selectedClass === "" || r.students?.class === selectedClass
  );

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        <h1 className="page-title">Results Manager</h1>

        {/* CLASS FILTER */}
        <div className="filter-bar">

          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedStudent(null);
              setSearch("");
            }}
          >
            <option value="">All Classes</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>
                Class {cls}
              </option>
            ))}
          </select>

        </div>

        {/* FORM */}
        <div className="results-form-card">

          <h3>Publish Result</h3>

          <form onSubmit={handleUpload}>

            {/* 🔥 SEARCH INPUT */}
            <div className="search-box">

              <input
                type="text"
                placeholder="Search student..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedStudent(null);
                }}
              />

              {filteredStudents.length > 0 && (
                <div className="search-dropdown">

                  {filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      className="search-item"
                      onClick={() => handleSelectStudent(s)}
                    >
                      {s.name} (Class {s.class})
                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* SELECTED */}
            {selectedStudent && (
              <p>
                Selected: {selectedStudent.name} (Class {selectedStudent.class})
              </p>
            )}

            {/* FILE */}
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Publish Result"}
            </button>

          </form>

        </div>

        {/* TABLE */}
        <div className="results-table-card">

          <h3>Published Results</h3>

          <table>

            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Result</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No results found
                  </td>
                </tr>
              ) : (

                filteredResults.map((r) => (

                  <tr key={r.id}>

                    <td>{r.students?.name}</td>

                    <td>{r.students?.class}</td>

                    <td>
                      <a href={r.result_pdf} target="_blank" rel="noreferrer">
                        View PDF
                      </a>
                    </td>

                    <td>
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>

                    <td>
                      <button onClick={() => deleteResult(r.id)}>
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

    </div>
  );
}

export default AdminResults;