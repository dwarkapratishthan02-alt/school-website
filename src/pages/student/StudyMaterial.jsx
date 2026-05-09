import {
  useEffect,
  useState,
  useCallback,
} from "react";

import { supabase } from "../../config/supabase";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/studyMaterial.css";

import {
  FaFilePdf,
  FaVideo,
  FaExternalLinkAlt,
  FaDownload,
  FaSearch,
} from "react-icons/fa";

function StudyMaterial() {

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentClass, setStudentClass] = useState("");
  const [search, setSearch] = useState("");

  /* ============================= */
  /* FETCH MATERIALS */
  /* ============================= */

  const fetchMaterials = useCallback(
    async (studentCls) => {

      try {

        const { data, error } = await supabase
          .from("study_materials")
          .select("*")
          .eq(
            "class",
            String(Number(studentCls))
          )
          .order("created_at", {
            ascending: false,
          });

        if (error) {
          console.log(error);
          return;
        }

        setMaterials(data || []);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    },
    []
  );

  /* ============================= */
  /* GET LOGGED IN STUDENT */
  /* ============================= */

  const fetchStudentData = useCallback(
    async () => {

      try {

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("students")
          .select("*")
          .eq("email", user.email);

        if (error) {
          console.log(error);
          setLoading(false);
          return;
        }

        if (!data || data.length === 0) {
          setLoading(false);
          return;
        }

        const student = data[0];

        const studentCls = String(
          Number(student.class)
        );

        setStudentClass(studentCls);

        fetchMaterials(studentCls);

      } catch (err) {

        console.log(err);

        setLoading(false);
      }
    },
    [fetchMaterials]
  );

  /* ============================= */
  /* USE EFFECT */
  /* ============================= */

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  /* ============================= */
  /* SEARCH FILTER */
  /* ============================= */

  const filteredMaterials = materials.filter(
    (item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.subject
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  /* ============================= */
  /* FILTERS */
  /* ============================= */

  const videos = filteredMaterials.filter(
    (m) => m.type?.toLowerCase() === "video"
  );

  const pdfs = filteredMaterials.filter(
    (m) =>
      m.type?.toLowerCase() === "book" ||
      m.type?.toLowerCase() === "pdf"
  );

  /* ============================= */
  /* YOUTUBE EMBED */
  /* ============================= */

  function getYouTubeEmbed(url) {

    try {

      if (!url) return "";

      const regExp =
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

      const match = url.match(regExp);

      return match
        ? `https://www.youtube.com/embed/${match[1]}`
        : "";

    } catch {

      return "";
    }
  }

  return (

    <div className="student-layout">

      <StudentSidebar />

      <div className="student-page">

        {/* HERO */}

        <div className="materials-hero">

          <div>

            <h1>📚 Study Materials</h1>

            <p>
              Access premium resources uploaded
              for Class {studentClass}
            </p>

          </div>

          <div className="class-badge">
            Class {studentClass}
          </div>

        </div>

        {/* SEARCH */}

        <div className="search-bar">

          <FaSearch />

          <input
            type="text"
            placeholder="Search by title or subject..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="premium-box">
            Loading materials...
          </div>

        ) : filteredMaterials.length === 0 ? (

          <div className="premium-box">
            No materials found.
          </div>

        ) : (

          <>
            {/* VIDEO SECTION */}

            <div className="material-section">

              <div className="section-header">

                <div className="section-icon">
                  <FaVideo />
                </div>

                <div>
                  <h2>Video Lectures</h2>
                  <p>Watch uploaded learning videos</p>
                </div>

              </div>

              <div className="materials-grid">

                {videos.length === 0 ? (

                  <div className="premium-box">
                    No videos available
                  </div>

                ) : (

                  videos.map((item) => (

                    <div
                      key={item.id}
                      className="premium-card"
                    >

                      <div className="card-top">

                        <span className="subject-badge">
                          {item.subject || "Subject"}
                        </span>

                        <span className="date-badge">
                          {new Date(
                            item.created_at
                          ).toLocaleDateString()}
                        </span>

                      </div>

                      <div className="video-wrapper">

                        <iframe
                          src={getYouTubeEmbed(
                            item.file_url
                          )}
                          title={item.title}
                          allowFullScreen
                        />

                      </div>

                      <h3>{item.title}</h3>

                      <p>{item.description}</p>

                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="premium-btn"
                      >

                        <FaExternalLinkAlt />

                        Watch Video

                      </a>

                    </div>
                  ))
                )}

              </div>

            </div>

            {/* PDF SECTION */}

            <div className="material-section">

              <div className="section-header">

                <div className="section-icon pdf">
                  <FaFilePdf />
                </div>

                <div>
                  <h2>PDF Notes & Books</h2>
                  <p>Download notes and study PDFs</p>
                </div>

              </div>

              <div className="materials-grid">

                {pdfs.length === 0 ? (

                  <div className="premium-box">
                    No PDFs available
                  </div>

                ) : (

                  pdfs.map((item) => (

                    <div
                      key={item.id}
                      className="premium-card pdf-card"
                    >

                      <div className="card-top">

                        <span className="subject-badge">
                          {item.subject || "Subject"}
                        </span>

                        <span className="date-badge">
                          {new Date(
                            item.created_at
                          ).toLocaleDateString()}
                        </span>

                      </div>

                      <div className="pdf-icon">

                        <FaFilePdf />

                      </div>

                      <h3>{item.title}</h3>

                      <p>{item.description}</p>

                      <div className="pdf-buttons">

                        <a
                          href={item.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="premium-btn"
                        >
                          Open PDF
                        </a>

                        <a
                          href={item.file_url}
                          download
                          className="download-btn"
                        >

                          <FaDownload />

                        </a>

                      </div>

                    </div>
                  ))
                )}

              </div>

            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default StudyMaterial;