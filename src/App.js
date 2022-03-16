import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import BetSetting from './pages/BetSetting';
import Ladder from './pages/Ladder';
import Results from './pages/Results';

function App() {
  return (
    <div style={{ margin: '20px' }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/betSetting" element={<BetSetting />} />
          <Route exact path="/ladder" element={<Ladder />} />
          <Route exact path="/results" element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
