import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Deepfake Guardian</h3>
            <p className="footer-description">
              AI-powered fraud detection tool that can detect deepfake audio and images.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/detect/audio">Audio Detection</a></li>
              <li><a href="/detect/image">Image Detection</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Deepfake Guardian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 