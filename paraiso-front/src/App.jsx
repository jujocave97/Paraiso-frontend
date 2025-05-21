import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './pages/Home';
import Tartas from './pages/Tartas';
import QuienesSomos from './pages/QuienesSomos';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './routes/PrivateRoutes';
import ReservaPage from './pages/ReservaPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tartas" element={<Tartas />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/login" element={<LoginPage />} />        
        <Route path="/register" element={<RegisterPage />} />   
        <Route path="/perfil" element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        } />
        <Route path="/reservar" element={
          <PrivateRoute roles={['USUARIO']}>
            <ReservaPage />
          </PrivateRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;