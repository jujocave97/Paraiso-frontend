import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function QuienesSomos() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="container my-5 text-center" style={{ backgroundColor: 'var(--color-beige)', padding: '2rem', borderRadius: '1rem' }}>
        
        {/* Introducción general */}
        <section className="mb-5">
          <h1 className="fw-bold mb-3" style={{ color: 'var(--color-azul-marino)' }}>Quiénes Somos</h1>
          <p className="lead" style={{ color: 'var(--color-marron)' }}>
            Paraíso, un lugar para soñar.
            Lo que comenzó como tardes de repostería casera se ha transformado en un proyecto
            lleno de ilusión: Paraíso, un obrador y tartería en Villamartín. 
            Nuestro trabajo consistió en plasmar esta evolución, desde sus raíces en “Las tartas de Andrea” 
            hasta su nuevo posicionamiento.
            Hemos creado una identidad visual que combina sencillez y modernidad, reflejando el cariño
            y la dedicación que Andrea pone en cada tarta. 
            Este branding representa su visión: hacer que cada cliente se sienta como en el paraíso con cada bocado.
          </p>
        </section>

        {/* Mascota */}
        <section className="mb-5" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <img
            src="/imgs/queiky.png"
            alt="Queik"
            className="img-fluid rounded shadow"
          />
          <h3 className="mt-3" style={{ color: 'var(--color-marron)' }}>Queik 🍰</h3>
          <p className="mt-2 mx-auto" style={{ maxWidth: '600px', color: 'var(--color-azul-marino)' }}>
            Este es Queik, la mascota de Paraíso.
            Su nombre lo escogimos como representación de la especialidad, las tartas de queso.
            Pensamos en ponerle Cake (tarta en inglés), pero como no queríamos que se 
            pronunciase literal, decidimos españolizarlo y añadirle una Q de queso, así que quedó 
            Queik.
          </p>
        </section>

        {/* Dueños */}
        <section className="mb-5" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <img
            src="/imgs/joseYAndrea.png"
            alt="Ana y Luis - Fundadores"
            className="img-fluid rounded shadow"
            style={{ maxWidth: '600px', maxHeight: '600px' }}
          />
          <div className="mt-4 px-3" style={{ color: 'var(--color-azul-marino)', maxWidth: '800px', margin: '0 auto' }}>
            <p>
              <strong>Andrea y Vega</strong> 
            </p>
            <p>
              Juntos, combinan creatividad, dedicación y mucho amor para crear un rincón donde el sabor y la felicidad se encuentran.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default QuienesSomos;
