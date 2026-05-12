import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import './ProductDetail.css';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (!product) return <div className="error">Product not found!</div>;

  const imageUrl = Array.isArray(product.images) && product.images[0] 
    ? product.images[0].replace(/[\[\]"]/g, '') 
    : 'https://via.placeholder.com/600';

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="product-content">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="image-section"
        >
          <img src={imageUrl} alt={product.title} className="main-image" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="info-section"
        >
          <span className="detail-category">{product.category.name}</span>
          <h1 className="detail-title">{product.title}</h1>
          
          <div className="rating-row">
            <div className="stars">
              <Star size={16} fill="#fbeb23" color="#fbeb23" />
              <Star size={16} fill="#fbeb23" color="#fbeb23" />
              <Star size={16} fill="#fbeb23" color="#fbeb23" />
              <Star size={16} fill="#fbeb23" color="#fbeb23" />
              <Star size={16} color="#d1d5db" />
            </div>
            <span className="review-count">(124 Reviews)</span>
          </div>

          <div className="detail-price">${product.price}</div>
          <p className="detail-description">{product.description}</p>

          <div className="action-row">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button 
              className="add-large-btn"
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <Truck size={24} className="feature-icon" />
              <div>
                <strong>Free Delivery</strong>
                <p>On orders over $100</p>
              </div>
            </div>
            <div className="feature-item">
              <ShieldCheck size={24} className="feature-icon" />
              <div>
                <strong>2 Year Warranty</strong>
                <p>Authentic products only</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
