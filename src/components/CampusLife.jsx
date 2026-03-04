import "../styles/campus.css";

function CampusLife() {
  return (
    <section className="campus-life">
      <div className="container">

        <div className="section-header">
          <h2>Campus Life</h2>
          <p>
            Experience a vibrant learning environment enriched with academics,
            sports, cultural activities and disciplined growth.
          </p>
        </div>

        <div className="campus-grid">
          <img src="https://images.unsplash.com/photo-1588072432836-e10032774350" alt="Classroom" />
          <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754" alt="Campus" />
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7" alt="Library" />
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644" alt="Sports" />
          <img src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178" alt="Cultural Activity" />
          <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b" alt="Students" />
        </div>

      </div>
    </section>
  );
}

export default CampusLife;