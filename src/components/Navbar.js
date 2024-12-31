import React, { useState } from "react";
import "./Navbar.css";
import { Eye, Menu } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <Eye size={24} />
          <span>DeepFake Detector</span>
        </a>
        <button
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <Menu size={24} />
        </button>
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <a href="#confusion-matrix">Confusion Matrix</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
