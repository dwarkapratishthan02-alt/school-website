import "../styles/facilities.css";

const facilities = [
  {
    title: "School Bus",
    desc: "Safe and reliable transport facility for students.",
  },
  {
    title: "Olympic Swimming Pool",
    desc: "Professional-level swimming pool for training and fitness.",
  },
  {
    title: "Sports Ground",
    desc: "Spacious playground for sports and physical development.",
  },
  {
    title: "Digital Classrooms",
    desc: "Smart classrooms with modern teaching technology.",
  },
  {
    title: "Activity-Based Learning",
    desc: "Interactive learning to enhance creativity and thinking.",
  },
  {
    title: "Computer Lab",
    desc: "Well-equipped lab for digital and technical skills.",
  },
  {
    title: "Science Lab",
    desc: "Advanced lab for practical science learning.",
  },
  {
    title: "Math Lab",
    desc: "Hands-on learning environment for mathematics.",
  },
];

function Facilities() {
  return (
    <section className="facilities">
      <h2>Our Facilities</h2>

      <div className="facilities-grid">
        {facilities.map((item, index) => (
          <div className="facility-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Facilities;