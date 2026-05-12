import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Package } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ cartCount, searchQuery, setSearchQuery }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Swift<span>Shop</span>
        </Link>

        <div className="navbar-search">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={20} className="search-icon" />
        </div>

        <div className="navbar-links">
          <Link to="/orders" className="navbar-item">
            <Package size={24} />
            <span className="navbar-text">Orders</span>
          </Link>
          <Link to="/cart" className="navbar-item cart-link">
            <ShoppingCart size={24} />
            <span className="navbar-text">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/login" className="navbar-item user-profile">
            <User size={24} />
            <span className="navbar-text">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
