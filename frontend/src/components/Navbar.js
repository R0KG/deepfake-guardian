import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          Deepfake Guardian
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/detect/audio" className="navbar-link">Audio Detection</Link>
          </li>
          <li className="navbar-item">
            <Link to="/detect/image" className="navbar-link">Image Detection</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 