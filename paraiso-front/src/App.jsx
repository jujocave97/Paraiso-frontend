import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;