import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import "../../styles/studyMaterial.css";

function StudyMaterial() {

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentClass, setStudentClass] = useState(null);

  useEffect(() => {
    loadMaterials();
  }, []);

  async function loadMaterials() {

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

      const userId = session.user.id;

      // 🔥 Get student profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("class")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        console.error("Profile not found");
        setLoading(false);
        return;
      }

      if (!profile.class) {
        console.warn("Student class not assigned");
        setLoading(false);
        return;
      }

      setStudentClass(profile.class);

      // 🔥 Fetch materials for student's class
      const { data, error } = await supabase
        .from("study_materials")
        .select("*")
        .eq("class", profile.class)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Materials fetch error:", error.message);
        setMaterials([]);
        return;
      }

      setMaterials(data || []);

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
    <section className="study-material-page">

      <div className="container">

        <div className="page-header">
          <h1>Study Materials</h1>
          <p>
            {studentClass
              ? `Resources for Class ${studentClass}`
              : "Download notes and learning resources uploaded by teachers."}
          </p>
        </div>

        <div className="materials-grid">

          {loading ? (

            <div className="empty-box">
              Loading study materials...
            </div>

          ) : !studentClass ? (

            <div className="empty-box">
              Your class is not assigned yet. Please contact admin.
            </div>

          ) : materials.length === 0 ? (

            <div className="empty-box">
              No study materials available for your class.
            </div>

          ) : (

            materials.map((item) => (

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

            ))

          )}

        </div>

      </div>

    </section>
  );
}

export default StudyMaterial;