import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Ladder1 from './pages/Ladder1';
import Ladder2 from './pages/Ladder2';
import Results from './pages/Results';

function App() {
  return (
    <div style={{ margin: '20px' }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/ladder1" element={<Ladder1 />} />
          <Route exact path="/ladder2" element={<Ladder2 />} />
          <Route exact path="/results" element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
