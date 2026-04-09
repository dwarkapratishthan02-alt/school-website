import "../styles/facilities.css";

const facilities = [
  { title: "School Bus", icon: "🚌" },
  { title: "Olympic Swimming Pool", icon: "🏊" },
  { title: "Sports Ground", icon: "🏟️" },
  { title: "Digital Classrooms", icon: "💻" },
  { title: "Activity-Based Learning", icon: "🎯" },
  { title: "Computer Lab", icon: "🖥️" },
  { title: "Science Lab", icon: "🔬" },
  { title: "Math Lab", icon: "📐" },
];

function Facilities() {
  return (
    <section className="facilities">

      <div className="facilities-header">
        <span className="badge">Our Infrastructure</span>

        <h2>World-Class Facilities</h2>

        <p>
          We provide modern infrastructure and a nurturing environment
          for holistic student development.
        </p>
      </div>

      <div className="facilities-grid">
        {facilities.map((item, index) => (
          <div className="facility-card" key={index}>
            <div className="facility-icon">{item.icon}</div>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Facilities;