import { useState, useEffect } from "react";
import "../styles/institutions.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1588072432836-e10032774350";

const institutionsData = [
  {
    title: "Little Birds Pre-Primary & Primary School",
    level: "Playgroup | Nursery | LKG | UKG | Std 1st to 4th",
    image: "/images/school.jpg",
    desc: "Building futures since 2012 with strong foundation learning.",
    details:
      "Little Birds School focuses on early childhood education through activity-based learning. We follow both CBSE and State Board curriculum, ensuring holistic development with strong values and modern education methods.",
  },
  {
    title: "Dwarka Pratishthan International Gurukul",
    level: "Std 5th to 10th",
    image: "/images/gurukul.jpg",
    desc: "Modern Gurukul system combining values and academics.",
    details:
      "Established in 2020, the Gurukul blends traditional Indian values with modern digital education. Students are trained in academics, discipline, leadership, and emotional development.",
  },
  {
    title: "Dwarka Pratishthan Junior College",
    level: "11th & 12th",
    image: "/images/college.jpg",
    desc: "Career-focused higher secondary education.",
    details:
      "Our junior college provides strong academic support, career guidance, and preparation for competitive exams. Focus is on building a successful future for every student.",
  },
  {
    title: "Shri Chhatrapati Shivaji Maharaj Defence & Non-Defence Academy",
    level: "After 10th",
    image: "/images/defence.jpg",
    desc: "Professional training for defence and career opportunities.",
    details:
      "We provide structured training for defence services along with non-defence career preparation. Students are guided with discipline, physical training, and expert coaching.",
  },
];

function Institutions() {
  const [selected, setSelected] = useState(null);

  /* 🔥 ESC KEY CLOSE */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* 🔥 PREVENT BACKGROUND SCROLL WHEN MODAL OPEN */
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
  }, [selected]);

  return (
    <section className="institutions">
      <div className="container">

        {/* HEADER */}
        <div className="section-header">
          <h2>Our Institutions</h2>
          <p>
            Building futures since 2012 through quality education, modern learning,
            and strong values across all stages.
          </p>
        </div>

        {/* GRID */}
        <div className="institution-grid">
          {institutionsData.map((item, index) => (
            <div
              className="institution-card"
              key={index}
              onClick={() => setSelected(item)}
            >
              <div className="institution-image">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => (e.target.src = fallbackImage)}
                />
              </div>

              <h3>{item.title}</h3>
              <p className="institution-level">{item.level}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* NOTE */}
        <div className="institution-note">
          <p>
            All institutions follow <strong>CBSE & State Board curriculum</strong>{" "}
            with <strong>activity-based learning</strong> to ensure holistic development.
          </p>
        </div>

      </div>

      {/* 🔥 MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>

          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            {/* IMAGE */}
            <img
              src={selected.image}
              alt={selected.title}
              onError={(e) => (e.target.src = fallbackImage)}
            />

            {/* TEXT */}
            <div className="modal-text">

              {/* CLOSE ICON */}
              <span
                className="close-btn"
                onClick={() => setSelected(null)}
              >
                ✕
              </span>

              <h2>{selected.title}</h2>

              <p className="institution-level">
                {selected.level}
              </p>

              <p>{selected.details}</p>

              <button onClick={() => setSelected(null)}>
                Close
              </button>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}

export default Institutions;