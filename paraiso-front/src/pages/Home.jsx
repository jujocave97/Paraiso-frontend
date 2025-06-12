import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InstagramFeed from '../components/InstagramFeed';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <header className="bg-turquesa text-white text-center py-5">
        <img src="/imgs/paraiso-logo-wide.png" alt="paraiso-logo" className='img-fluid' />
        <p className="lead">Sin tartas no hay paraíso.</p>
      </header>

      <div className="container flex-grow-1 my-4">
        {/* Aquí va tu contenido de la tienda */}
        <h2 style={{ textAlign: 'center', color: '#40d9c6', fontWeight: '700', marginBottom: '2rem' }}>
            Nuestras tartas más populares
        </h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/imgs/pistacho1.png" className="card-img-top" alt="Tarta de Happy hippo" />
              <div className="card-body">
                <h5 className="card-title">Happy Hippo</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/imgs/pistacho1.png" className="card-img-top" alt="Tarta de Pistacho" />
              <div className="card-body">
                <h5 className="card-title">Pistacho</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/imgs/tartaQueso1.png" className="card-img-top" alt="Tarta de filipinos y chocolate blanco" />
              <div className="card-body">
                <h5 className="card-title">Filipinos y chocolate blanco</h5>
              </div>
            </div>
          </div>
          {/* Más tartas aquí */}
        </div>
        <div className="text-center mt-5">
          <Link to="/tartas" className="btn btn-lg px-5 py-3 rounded-pill shadow-sm" style={{
            backgroundColor: '#40d9c6',
            borderColor: '#40d9c6',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}>
            🍰 Ver todos los productos
          </Link>
        </div>
        <div className="container flex-grow-1 my-4">
          <InstagramFeed />
        </div>
      </div>
  

      <Footer />
    </div>
  );
}

export default Home;
