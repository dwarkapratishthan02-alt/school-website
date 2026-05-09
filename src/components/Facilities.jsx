import "../styles/facilities.css";

const facilities = [
  {
    title: "School Bus",
    icon: "🚌",
    desc: "Safe and GPS-enabled transportation covering nearby areas.",
  },

  {
    title: "Olympic Swimming Pool",
    icon: "🏊",
    desc: "Professional swimming facility for fitness and competitions.",
  },

  {
    title: "Sports Ground",
    icon: "🏟️",
    desc: "Large playgrounds for outdoor sports and physical activities.",
  },

  {
    title: "Digital Classrooms",
    icon: "💻",
    desc: "Smart classrooms equipped with modern digital learning tools.",
  },

  {
    title: "Activity-Based Learning",
    icon: "🎯",
    desc: "Interactive learning methods focused on practical understanding.",
  },

  {
    title: "Computer Lab",
    icon: "🖥️",
    desc: "Advanced computer labs with high-speed internet and systems.",
  },

  {
    title: "Science Lab",
    icon: "🔬",
    desc: "Fully equipped laboratories for practical scientific learning.",
  },

  {
    title: "Math Lab",
    icon: "📐",
    desc: "Hands-on mathematics learning through innovative activities.",
  },
];

function Facilities() {

  return (

    <section className="facilities">

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="facilities-header">

        <span className="badge">
          Premium Infrastructure
        </span>

        <h2>
          World-Class Facilities
        </h2>

        <p>
          We provide a modern, safe, and inspiring
          environment that supports academic excellence,
          creativity, innovation, sports, and holistic
          student development.
        </p>

      </div>

      {/* ========================================= */}
      {/* GRID */}
      {/* ========================================= */}

      <div className="facilities-grid">

        {facilities.map((item, index) => (

          <div
            className="facility-card"
            key={index}
          >

            {/* ICON */}

            <div className="facility-icon">

              {item.icon}

            </div>

            {/* TITLE */}

            <h3>
              {item.title}
            </h3>

            {/* DESCRIPTION */}

            <p>
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Facilities;