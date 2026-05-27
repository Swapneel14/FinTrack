import React from "react";

function Footer(){
    return(
 <>
      <footer className="py-5 mt-5 border-top">
        
        <div className="container text-center">

          <h3 className="fw-bold mb-3 logo-text">
            FinTrack
          </h3>

          <p className="text-muted mb-4">
            Track smarter. Spend better.
          </p>

          <div className="d-flex justify-content-center gap-4 mb-4">

            <a href="/" className="text-decoration-none nav-link">
              Home
            </a>

            <a href="#features" className="text-decoration-none nav-link">
              Features
            </a>

            <a href="#about" className="text-decoration-none nav-link">
              About
            </a>

            <a href="/signup" className="text-decoration-none nav-link">
              Signup
            </a>

          </div>

          <p className="text-muted small mb-0">
            © 2026 FinTrack. All rights reserved.
          </p>

        </div>

      </footer>
    </>
    );
}

export default Footer;