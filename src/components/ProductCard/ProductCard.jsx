import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  // Platzi API images can be a bit weird sometimes (strings within strings)
  const imageUrl = Array.isArray(product.images) && product.images[0] 
    ? product.images[0].replace(/[\[\]"]/g, '') // Clean weird formatting
    : 'https://via.placeholder.com/300';

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.title} />
        <div className="product-overlay">
          <Link to={`/product/${product.id}`} className="view-btn">
            <Eye size={20} />
          </Link>
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category.name}</span>
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="product-price">${product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
