import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import "../../styles/results.css";

function Results() {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentFound, setStudentFound] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResults();
  }, []);

  async function loadResults() {
    try {
      setLoading(true);
      setError(null);

      // 🔥 Get logged in user
      const { data: { user }, error: userError } =
        await supabase.auth.getUser();

      if (userError || !user) {
        setError("User not logged in");
        return;
      }

      let studentId = null;

      // 🔥 Try profiles table first
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

      // 🔥 Fetch results
      const { data, error: resultError } = await supabase
        .from("results")
        .select("*")
        .eq("student_id", studentId)
        .order("created_at", { ascending: false });

      if (resultError) {
        setError("Failed to load results");
        return;
      }

      setResults(data || []);

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
    <section className="results-page">

      <div className="container">

        <div className="page-header">
          <h1>My Results</h1>
          <p>Download and view your exam results.</p>
        </div>

        <div className="results-table">

          {/* 🔥 Loading */}
          {loading && (
            <div className="empty-box">
              Loading results...
            </div>
          )}

          {/* 🔥 Error */}
          {!loading && error && (
            <div className="empty-box">
              {error}
            </div>
          )}

          {/* 🔥 Student not found */}
          {!loading && !error && !studentFound && (
            <div className="empty-box">
              Your student record was not found. Please contact admin.
            </div>
          )}

          {/* 🔥 No results */}
          {!loading && !error && studentFound && results.length === 0 && (
            <div className="empty-box">
              No results available yet.
            </div>
          )}

          {/* 🔥 Results Table */}
          {!loading && !error && studentFound && results.length > 0 && (

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