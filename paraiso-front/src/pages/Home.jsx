import React from 'react';

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary w-100">
        <a className="navbar-brand" href="#">Tienda de Tartas</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Menú</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacto</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section text-center text-light py-5" style={{ backgroundColor: '#003153', width: '100vw', height: '100vh' }}>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
          <div>
            <h1 className="display-3">¡Bienvenidos a la Tienda de Tartas!</h1>
            <p className="lead">Las mejores tartas frescas hechas con amor. ¡Haz tu pedido ahora!</p>
            <a href="#menu" className="btn btn-primary btn-lg mt-3">Ver Tartas</a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section py-5" style={{ backgroundColor: '#F5F5DC', width: '100vw' }}>
        <div className="container text-center">
          <h2 className="mb-4" style={{ color: '#003153' }}>Sobre Nosotros</h2>
          <p>En nuestra tienda, cada tarta es una obra de arte. Usamos los mejores ingredientes para crear las tartas más deliciosas y frescas.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4" style={{ backgroundColor: '#003153', color: '#F5F5DC' }}>
        <p>&copy; 2025 Tienda de Tartas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
