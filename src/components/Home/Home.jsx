import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import './Home.css';

const Home = ({ addToCart, searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const data = await response.json();
      setCategories(data.slice(0, 5)); // Just take first 5
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category.id === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="spinner" size={48} />
        <p>Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-banner">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-content"
        >
          <h1>New Season Arrivals</h1>
          <p>Discover the latest trends in fashion and technology.</p>
          <button className="shop-now-btn">Shop Now</button>
        </motion.div>
      </div>

      <div className="main-content">
        <aside className="filters">
          <h3>Categories</h3>
          <ul className="category-list">
            <li 
              className={selectedCategory === null ? 'active' : ''}
              onClick={() => setSelectedCategory(null)}
            >
              All Products
            </li>
            {categories.map(cat => (
              <li 
                key={cat.id}
                className={selectedCategory === cat.id ? 'active' : ''}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </li>
            ))}
          </ul>

          <div className="search-filter">
            <h3>Search</h3>
            <input 
              type="text" 
              placeholder="Finding something?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </aside>

        <section className="product-grid-section">
          <div className="product-grid-header">
            <h2>Our Products ({filteredProducts.length})</h2>
          </div>
          
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} addToCart={addToCart} />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
