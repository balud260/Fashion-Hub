import React from 'react';
import { Package, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import './Orders.css';

const Orders = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <Package size={64} className="empty-icon" />
        <h2>No orders found</h2>
        <p>You haven't placed any orders yet. Once you do, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1 className="orders-title">My Orders</h1>
      <div className="orders-list">
        {orders.map((order, idx) => (
          <motion.div 
            key={order.id} 
            className="order-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="order-header">
              <div className="order-main-info">
                <span className="order-number">Order #{order.id.slice(-6).toUpperCase()}</span>
                <span className="order-date">
                  <Clock size={14} /> {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
              <div className="order-status-badge">Processing</div>
            </div>
            
            <div className="order-body">
              <div className="order-items-preview">
                {order.items.map(item => (
                  <div key={item.id} className="order-item-thumb">
                    <img src={item.images[0].replace(/[\[\]"]/g, '')} alt={item.title} />
                    <span className="thumb-qty">{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="order-total-info">
                <span className="total-label">Total Amount</span>
                <span className="order-price">${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="order-footer">
              <div className="shipping-to">
                <strong>Shipping to:</strong> {order.shippingDetails.firstName} {order.shippingDetails.lastName}, {order.shippingDetails.address}
              </div>
              <button className="view-order-details">View Details</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
