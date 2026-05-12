import React from 'react';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="navbar-logo">Swift<span>Shop</span></h2>
          <p>Your one-stop destination for quality fashion and electronics. Fresh trends delivered to your door.</p>
          <div className="social-links">
            <Facebook size={20} />
            <Twitter size={20} />
            <Instagram size={20} />
            <Github size={20} />
          </div>
        </div>
        
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Shop</h3>
            <ul>
              <li>Fashion</li>
              <li>Electronics</li>
              <li>Furniture</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <ul>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Return Policy</li>
              <li>Shipping Info</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 SwiftShop E-commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
