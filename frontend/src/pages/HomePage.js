import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">Deepfake Guardian</h1>
          <p className="hero-subtitle">
            AI-powered fraud detection to protect your business from deepfake scams
          </p>
          <div className="hero-buttons">
            <Link to="/detect/audio" className="btn btn-primary">
              Detect Audio Deepfakes
            </Link>
            <Link to="/detect/image" className="btn btn-secondary">
              Detect Image Deepfakes
            </Link>
          </div>
        </section>

        <section className="features">
          <h2 className="section-title">How It Works</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3 className="feature-title">Audio Detection</h3>
              <p className="feature-description">
                Upload audio files to detect AI-generated speech or voice cloning used in scam calls.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Image Detection</h3>
              <p className="feature-description">
                Upload images to detect manipulated photos, doctored invoices, or fake identities.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Fast Results</h3>
              <p className="feature-description">
                Get instant analysis with confidence scores to determine if content is authentic or fake.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Advanced AI</h3>
              <p className="feature-description">
                Powered by state-of-the-art deep learning models trained on thousands of examples.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
