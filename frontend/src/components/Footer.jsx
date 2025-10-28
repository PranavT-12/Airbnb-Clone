

import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer py-3 bg-body-light shadow-sm">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        {/* Left side: text + links */}
        <div className="footer-left d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 gap-md-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
          <div className="d-flex gap-2">
            <a href="#!" className="text-black">About</a>
            <a href="#!" className="text-black">Privacy Policy</a>
          </div>
        </div>

        {/* Right side: social icons */}
        <div className="social-icons d-flex flex-wrap gap-2 mt-2 mt-md-0">
          <div className="d-flex align-items-center gap-2">
            <i className="fa-solid fa-globe"></i>
            <span>English (IN)</span>
          </div>
          <i className="fa-brands fa-facebook mx-2"></i>
          <i className="fa-brands fa-x-twitter mx-2"></i>
          <i className="fa-brands fa-instagram mx-2"></i>
        </div>
      </div>
    </footer>
  );
}