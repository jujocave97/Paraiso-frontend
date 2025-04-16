import React from 'react';

function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
    {/* NAV */}
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#40d9c6' }}>
      <div className="container-fluid">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Nuestras Tartas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Quiénes Somos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Encuéntranos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* HEADER */}
    <header className="bg-turquesa text-white text-center py-5">
      <img src="./../../imgs/paraiso-logo-wide.png" alt="paraiso-logo" />
      <p className="lead">Paraíso, un lugar para soñar.</p>
    </header>

    {/* CONTENIDO */}
    <div className="container flex-grow-1 my-4">
      {/* Aquí va tu contenido de la tienda */}
    </div>

    {/* FOOTER */}
    <footer className="bg-turquesa text-white text-center py-3">
      <small>&copy; 2025 Paraíso de Tartas. Todos los derechos reservados.</small>
    </footer>
  </div>
  );
}

export default Home;
