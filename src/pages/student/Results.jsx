import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import "../../styles/results.css";

function Results() {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentFound, setStudentFound] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  async function loadResults() {

    try {

      setLoading(true);

      // 🔥 Get session
      const { data: { session }, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error("No session");
        setLoading(false);
        return;
      }

      const userEmail = session.user.email;

      // 🔥 Find student using email
      const { data: student, error: studentError } = await supabase
        .from("students")
        .select("id")
        .eq("email", userEmail)
        .single();

      if (studentError || !student) {
        console.warn("Student not found for this user");
        setStudentFound(false);
        setResults([]);
        return;
      }

      setStudentFound(true);

      // 🔥 Fetch results
      const { data, error } = await supabase
        .from("results")
        .select("*")
        .eq("student_id", student.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Results fetch error:", error.message);
        setResults([]);
        return;
      }

      setResults(data || []);

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
    <section className="results-page">

      <div className="container">

        <div className="page-header">
          <h1>My Results</h1>
          <p>Download and view your exam results.</p>
        </div>

        <div className="results-table">

          {loading ? (

            <div className="empty-box">
              Loading results...
            </div>

          ) : !studentFound ? (

            <div className="empty-box">
              Your student record was not found. Please contact admin.
            </div>

          ) : results.length === 0 ? (

            <div className="empty-box">
              No results available yet.
            </div>

          ) : (

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>View</th>
                  <th>Download</th>
                </tr>
              </thead>

              <tbody>

                {results.map((r) => (

                  <tr key={r.id}>

                    <td>{formatDate(r.created_at)}</td>

                    <td>
                      {r.result_pdf ? (
                        <a
                          href={r.result_pdf}
                          target="_blank"
                          rel="noreferrer"
                          className="view-btn"
                        >
                          View Result
                        </a>
                      ) : (
                        "Not available"
                      )}
                    </td>

                    <td>
                      {r.result_pdf ? (
                        <a
                          href={r.result_pdf}
                          download
                          className="download-btn"
                        >
                          Download
                        </a>
                      ) : (
                        "-"
                      )}
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

export default Results;