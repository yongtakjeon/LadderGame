import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Ladder1 from './pages/Ladder1';

function App() {
  return (
    <div style={{ margin: '20px' }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/ladder1" element={<Ladder1 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
