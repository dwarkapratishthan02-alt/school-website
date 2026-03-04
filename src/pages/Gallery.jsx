import "../styles/gallery.css";

function Gallery() {
  return (
    <section className="gallery-page">
      <div className="container">

        <div className="page-header">
          <h1>Gallery</h1>
          <p>
            Glimpses of campus life, academic excellence and co-curricular
            activities at Dwarka Pratishthan.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="gallery-filters">
          <button className="active">All</button>
          <button>Academics</button>
          <button>Sports</button>
          <button>Events</button>
        </div>

        {/* Image Grid */}
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1588072432836-e10032774350" alt="Classroom" />
          <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754" alt="Campus" />
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7" alt="Library" />
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644" alt="Sports" />
          <img src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178" alt="Event" />
          <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b" alt="Students" />
        </div>

      </div>
    </section>
  );
}

export default Gallery;