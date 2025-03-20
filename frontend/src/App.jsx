import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PlayersPage from './components/PlayersPage';
import SquadPage from './components/SquadPage';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/squad" element={<SquadPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
