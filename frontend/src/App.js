import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AudioDetectionPage from './pages/AudioDetectionPage';
import ImageDetectionPage from './pages/ImageDetectionPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detect/audio" element={<AudioDetectionPage />} />
          <Route path="/detect/image" element={<ImageDetectionPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 