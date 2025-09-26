import React from "react";
import "./Footer.css";
import visa from '../assets/master.jpg'
import paypal from '../assets/paypal.png'
import gpay from '../assets/gpay.png'
import master from '../assets/master.png'
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>AT2 Watches</h3>
          <p>
            Discover timeless elegance and modern smartwatches.  
            Premium collections from Rolex, Casio, Fossil, Noise & Samsung.  
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a>Shop</a></li>
            <li><a>Blog</a></li>
            <li><a>Cart</a></li>
            <li><a>Checkout</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>We Accept</h4>
          <div className="payments">
            <img src={visa} alt="Visa" />
            <img src={master} alt="Mastercard" />
            <img src={paypal} alt="PayPal" />
            <img src={gpay} alt="Google Pay" />
          </div>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@at2watches.com</p>
          <p>Phone: +91 8943379345</p>
          <p>Location: Manjeri,Kerala</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 AT2 Watches. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
