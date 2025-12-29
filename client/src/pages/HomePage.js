import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    fetchFeaturedRecipes();
  }, []);

  const fetchFeaturedRecipes = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/recipes`);
      setFeaturedRecipes(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/recipes?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const categories = [
    { name: 'Breakfast', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300' },
    { name: 'Vegan', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300' },
    { name: 'Desserts', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300' },
    { name: 'Lunch', image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=300' },
    { name: 'Dinner', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300' },
    { name: 'Snacks', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Amazing Recipes</h1>
          <p>Share your culinary creations and explore recipes from around the world</p>
          <div className="hero-buttons">
            <Link to="/recipes" className="btn btn-primary">
              Browse Recipes
            </Link>
            <Link to="/submit" className="btn btn-secondary">
              Submit a Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search recipes by title or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories">
        <div className="container">
          <h2>Featured Recipe Categories</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/recipes?category=${category.name}`}
                className="category-card"
              >
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="recipes-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Recipes</h2>
            <Link to="/recipes" className="btn btn-primary">
              View All Recipes
            </Link>
          </div>
          <div className="recipe-grid">
            {featuredRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-card-content">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  <div className="recipe-meta">
                    <span className="category">{recipe.category}</span>
                    <span className="rating">⭐ {recipe.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;