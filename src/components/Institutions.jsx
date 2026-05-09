import { useState, useEffect } from "react";
import "../styles/institutions.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1588072432836-e10032774350";

const institutionsData = [
  {
    title:
      "Little Birds Pre-Primary & Primary School",

    level:
      "Playgroup | Nursery | LKG | UKG | Std 1st to 4th",

    image: "/images/school1.jpeg",

    desc:
      "Building strong foundations through joyful and activity-based learning.",

    details:
      "Little Birds School focuses on early childhood education through activity-based learning. We follow both CBSE and State Board curriculum while ensuring holistic development, creativity, discipline, and modern teaching methods for every child.",
  },

  {
    title:
      "Dwarka Pratishthan International Gurukul",

    level: "Std 5th to 10th",

    image: "/images/school2.jpg",

    desc:
      "Blending traditional values with modern academic excellence.",

    details:
      "Established in 2020, the Gurukul combines Indian cultural values with advanced education techniques. Students receive training in academics, discipline, leadership, communication, and emotional growth within a modern learning environment.",
  },

  {
    title:
      "Dwarka Pratishthan Junior College",

    level: "11th & 12th",

    image: "/images/school3.jpg",

    desc:
      "Career-focused higher secondary education with expert guidance.",

    details:
      "Our Junior College provides quality higher secondary education with strong academic support, career counseling, and preparation for competitive examinations. The institution focuses on helping students build successful futures with confidence.",
  },

  {
    title:
      "Shri Chhatrapati Shivaji Maharaj Defence & Non-Defence Academy",

    level: "After 10th",

    image: "/images/school4.jpeg",

    desc:
      "Professional training for defence and career opportunities.",

    details:
      "The academy offers structured defence and non-defence career preparation with expert coaching, discipline training, leadership development, and physical fitness programs designed to prepare students for future success.",
  },
];

function Institutions() {
  const [selected, setSelected] =
    useState(null);

  /* ========================================= */
  /* ESC CLOSE */
  /* ========================================= */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEsc
      );
  }, []);

  /* ========================================= */
  /* LOCK SCROLL */
  /* ========================================= */

  useEffect(() => {
    document.body.style.overflow =
      selected ? "hidden" : "auto";
  }, [selected]);

  return (
    <section className="institutions">

      <div className="container">

        {/* HEADER */}

        <div className="section-header">

          <h2>
            Our Institutions
          </h2>

          <p>
            Building future-ready students through
            quality education, strong values,
            discipline, and modern learning
            across every stage of education.
          </p>

        </div>

        {/* GRID */}

        <div className="institution-grid">

          {institutionsData.map(
            (item, index) => (

              <div
                key={index}
                className="institution-card"
                onClick={() =>
                  setSelected(item)
                }
              >

                {/* IMAGE */}

                <div className="institution-image">

                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) =>
                      (e.target.src =
                        fallbackImage)
                    }
                  />

                </div>

                {/* CONTENT */}

                <h3>
                  {item.title}
                </h3>

                <p className="institution-level">
                  {item.level}
                </p>

                <p>
                  {item.desc}
                </p>

              </div>
            )
          )}

        </div>

        {/* NOTE */}

        <div className="institution-note">

          <p>

            All institutions follow{" "}

            <strong>
              CBSE & State Board curriculum
            </strong>

            {" "}with{" "}

            <strong>
              activity-based learning
            </strong>

            {" "}to ensure academic excellence
            and holistic development.

          </p>

        </div>

      </div>

      {/* MODAL */}

      {selected && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelected(null)
          }
        >

          <div
            className="horizontal-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* IMAGE SIDE */}

            <div className="modal-image-side">

              <img
                src={selected.image}
                alt={selected.title}
                onError={(e) =>
                  (e.target.src =
                    fallbackImage)
                }
              />

            </div>

            {/* TEXT SIDE */}

            <div className="modal-text-side">

              <button
                className="close-btn"
                onClick={() =>
                  setSelected(null)
                }
              >
                ✕
              </button>

              <div className="modal-badge">
                {selected.level}
              </div>

              <h2>
                {selected.title}
              </h2>

              <p className="modal-description">
                {selected.details}
              </p>

              <div className="modal-features">

                <div className="feature-box">
                  Modern Learning
                </div>

                <div className="feature-box">
                  Expert Faculty
                </div>

                <div className="feature-box">
                  Activity Based
                </div>

                <div className="feature-box">
                  Career Guidance
                </div>

              </div>

              <button
                className="modal-action-btn"
                onClick={() =>
                  setSelected(null)
                }
              >
                Explore Institution
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default Institutions;