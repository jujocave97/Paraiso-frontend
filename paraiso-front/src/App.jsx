import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Tartas from './pages/Tartas';
import QuienesSomos from './pages/QuienesSomos';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfile from './pages/UserProfile';
import ReservaPage from './pages/ReservaPage';
import GestionarReservas from './pages/GestionarReservas'; // 👈 importa la página del admin
import GestionarTartas from './pages/GestionarTartas'; 
import GestionarUsuarios from './pages/GestionarUsuarios'; 
import PrivateRoute from './routes/PrivateRoutes';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tartas" element={<Tartas />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/reservar"
          element={
            <PrivateRoute roles={['USUARIO']}>
              <ReservaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/reservas"
          element={
            <PrivateRoute roles={['ADMIN']}>
              <GestionarReservas />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/tartas"
          element={
            <PrivateRoute roles={['ADMIN']}>
              <GestionarTartas />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <PrivateRoute roles={['ADMIN']}>
              <GestionarUsuarios />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
