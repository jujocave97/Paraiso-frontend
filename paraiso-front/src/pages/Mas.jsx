import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Mas() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="container flex-grow-1 my-5">
        {/* TÍTULO PRINCIPAL */}
        <h2 className="text-center mb-4" style={{ color: '#996515', fontWeight: 'bold' }}>Contacto</h2>

        {/* FORMULARIO DE CONTACTO */}
        <div className="row mb-5 justify-content-center">
          <div className="col-md-8">
            <h4 className="fw-bold mb-3" style={{ color: '#003153' }}>Escríbenos</h4>
            <form
              action="https://formsubmit.co/lastartasdeandrea@gmail.com"
              method="POST"
              className="w-100 mx-auto"
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" name="name" required />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="email" name="email" required />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Mensaje</label>
                <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </div>

        {/* MAPA */}
        <div className="row">
          <div className="col-12">
            <h4 className="fw-bold mb-3 text-center" style={{ color: '#003153' }}>¿Dónde estamos?</h4>
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199.52111426415337!2d-5.64772022194586!3d36.85833177256842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0d7500b1d7f563%3A0xd13aea4f87c4f32f!2zUGFyYcOtc28!5e0!3m2!1ses!2ses!4v1749665553047!5m2!1ses!2ses"
                allowFullScreen=""
                loading="lazy"
                title="Ubicación de la tienda"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Mas;
