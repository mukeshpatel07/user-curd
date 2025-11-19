import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-2">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-5" to="/">
          Synergy-Lab
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          
          {/* Left Side: HOME */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fs-6" to="/">
                Home
              </Link>
            </li>
          </ul>

          

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
