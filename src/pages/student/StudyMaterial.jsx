import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import "../../styles/studyMaterial.css";

function StudyMaterial() {

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentClass, setStudentClass] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMaterials();
  }, []);

  async function loadMaterials() {
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

      let studentClassValue = null;

      // 🔥 Try profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("class")
        .eq("id", user.id)
        .single();

      if (profile && profile.class) {
        studentClassValue = profile.class;
      } else {

        // 🔥 Fallback: students table (IMPORTANT for your setup)
        const { data: student } = await supabase
          .from("students")
          .select("class")
          .eq("email", user.email)
          .single();

        if (student && student.class) {
          studentClassValue = student.class;
        }
      }

      if (!studentClassValue) {
        setError("Your class is not assigned yet.");
        return;
      }

      setStudentClass(studentClassValue);

      // 🔥 Fetch materials for class
      const { data, error: materialError } = await supabase
        .from("study_materials")
        .select("*")
        .eq("class", studentClassValue)
        .order("created_at", { ascending: false });

      if (materialError) {
        setError("Failed to load materials");
        return;
      }

      setMaterials(data || []);

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
    <section className="study-material-page">

      <div className="container">

        <div className="page-header">
          <h1>Study Materials</h1>
          <p>
            {studentClass
              ? `Resources for Class ${studentClass}`
              : "Loading your class data..."}
          </p>
        </div>

        <div className="materials-grid">

          {/* 🔥 Loading */}
          {loading && (
            <div className="empty-box">
              Loading study materials...
            </div>
          )}

          {/* 🔥 Error */}
          {!loading && error && (
            <div className="empty-box">
              {error}
            </div>
          )}

          {/* 🔥 No Data */}
          {!loading && !error && materials.length === 0 && (
            <div className="empty-box">
              No study materials available for your class.
            </div>
          )}

          {/* 🔥 Data */}
          {!loading && !error && materials.map((item) => (

            <div key={item.id} className="material-card">

              <h3>{item.title}</h3>

              <p>
                {item.description || "No description available"}
              </p>

              <span className="material-class">
                Class: {item.class}
              </span>

              <span className="material-date">
                Uploaded: {formatDate(item.created_at)}
              </span>

              {item.file_url && (
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  Download
                </a>
              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default StudyMaterial;