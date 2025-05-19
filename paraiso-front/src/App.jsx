import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './pages/Home';
import Tartas from './pages/Tartas';
import QuienesSomos from './pages/QuienesSomos';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tartas" element={<Tartas />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/login" element={<LoginPage />} />        
        <Route path="/register" element={<RegisterPage />} />   

        

      </Routes>
    </Router>
  );
}

export default App;