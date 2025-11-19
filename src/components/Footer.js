import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">

          {/* Project Info */}
          <div className="col-md-4 mb-3">
            <h5>User Management System</h5>
            <p className="text-muted small">
              A simple and clean React-based CRUD application for managing users,
              built with REST API integration, routing, and reusable components.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-md-4 mb-3">
            <h5>Navigation</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/create" className="text-light text-decoration-none">Create User</a></li>
              <li><a href="#" className="text-light text-decoration-none">Documentation</a></li>
              <li><a href="#" className="text-light text-decoration-none">Support</a></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div className="col-md-4 mb-3">
            <h5>Connect</h5>
            <p className="text-muted small">Follow for more projects & updates:</p>

            <a href="#" className="text-light me-3">
              <i className="bi bi-github fs-4"></i>
            </a>
            <a href="#" className="text-light me-3">
              <i className="bi bi-linkedin fs-4"></i>
            </a>
            <a href="#" className="text-light me-3">
              <i className="bi bi-twitter-x fs-4"></i>
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="small mb-0 text-muted">
            © {new Date().getFullYear()} User Management Dashboard. Built with React.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
