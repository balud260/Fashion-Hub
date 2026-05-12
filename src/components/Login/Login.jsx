import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login feature is under development. Please browse as a guest!');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Login to your SwiftShop account</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="login-btn">
            <LogIn size={20} /> Sign In
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <span className="signup-link">Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
