import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './pages/Home';
import Tartas from './pages/Tartas';
import QuienesSomos from './pages/QuienesSomos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tartas" element={<Tartas />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
      </Routes>
    </Router>
  );
}

export default App;