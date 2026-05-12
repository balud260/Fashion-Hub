import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './Checkout.css';

const Checkout = ({ cart, placeOrder }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend
    placeOrder(formData);
    navigate('/orders');
  };

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="section-header">
              <Truck size={20} />
              <h3>Shipping Information</h3>
            </div>
            <div className="form-grid">
              <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} className="span-2" />
              <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
              <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
              <input type="text" name="address" placeholder="Address" required onChange={handleChange} className="span-2" />
              <input type="text" name="city" placeholder="City" required onChange={handleChange} />
              <input type="text" name="zip" placeholder="ZIP Code" required onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <CreditCard size={20} />
              <h3>Payment Details</h3>
            </div>
            <div className="form-grid">
              <input type="text" name="cardNumber" placeholder="Card Number" required onChange={handleChange} className="span-2" />
              <input type="text" name="expiry" placeholder="MM/YY" required onChange={handleChange} />
              <input type="text" name="cvv" placeholder="CVV" required onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order (${total.toFixed(2)})
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Your Order</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
