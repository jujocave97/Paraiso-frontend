// src/components/InstagramFeed.jsx
import React from 'react';

const InstagramFeed = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Síguenos en Instagram</h2>
      <div className="d-flex justify-content-center">
        <iframe
          title="Instagram Feed"
          src="https://lightwidget.com/widgets/tu-widget-id.html" // Reemplaza con tu enlace
          width="100%"
          height="400"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          allowTransparency="true"
        ></iframe>
      </div>
    </div>
  );
};

export default InstagramFeed;
