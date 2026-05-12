import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './components/Home/Home.jsx';
import ProductDetail from './components/ProductDetail/ProductDetail.jsx';
import Cart from './components/Cart/Cart.jsx';
import Checkout from './components/Checkout/Checkout.jsx';
import Orders from './components/Orders/Orders.jsx';
import Login from './components/Login/Login.jsx';

export default function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('swiftshop_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedOrders = localStorage.getItem('swiftshop_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('swiftshop_cart', JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('swiftshop_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const placeOrder = (shippingDetails) => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;

    const newOrder = {
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString(),
      items: [...cart],
      total,
      shippingDetails
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // Clear cart after order
  };

  return (
    <Router>
      <div className="app-main">
        <Navbar 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} placeOrder={placeOrder} />} />
            <Route path="/orders" element={<Orders orders={orders} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
