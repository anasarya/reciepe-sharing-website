import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, logout }) => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <div className="logo-container">
              <div className="logo-icon">
                <span className="chef-hat">👨‍🍳</span>
                <span className="sparkle">✨</span>
              </div>
              <div className="logo-text">
                <span className="logo-main">Recipe</span>
                <span className="logo-sub">Hub</span>
              </div>
            </div>
          </Link>
          
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Browse Recipes</Link></li>
            <li><Link to="/submit">Submit Recipe</Link></li>
            {user && <li><Link to="/profile">Profile</Link></li>}
          </ul>

          <div className="auth-buttons">
            {user ? (
              <>
                <span>Welcome, {user.username}!</span>
                <button onClick={logout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;