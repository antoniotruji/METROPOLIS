import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-text">
            Data Sources: NASA Earth Observations, OpenStreetMap, Local Urban Databases
          </span>
        </div>
        <div className="footer-right">
          <a href="#privacy" className="footer-link">Privacy Policy</a>
          <span className="footer-separator">•</span>
          <a href="#terms" className="footer-link">Terms of Use</a>
          <span className="footer-separator">•</span>
          <span className="footer-text">© 2024 UDT Project</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
