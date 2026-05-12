import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Cart.css';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={64} className="empty-icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="start-shopping-btn">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="cart-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="cart-item-image">
                <img src={item.images[0].replace(/[\[\]"]/g, '')} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="item-name">{item.title}</Link>
                <p className="item-category">{item.category.name}</p>
                <p className="item-price-each">${item.price} each</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout <ArrowRight size={20} />
          </Link>
          
          <p className="shipping-note">
            {shipping === 0 
              ? '🎉 You qualify for free shipping!' 
              : `Add $${(100 - subtotal).toFixed(2)} more for free shipping.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
