import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const SubmitRecipe = ({ user, token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: 'Breakfast',
    cookingTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Vegan', 'Desserts', 'Snacks'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please login to submit a recipe');
      return;
    }

    if (!formData.title || !formData.description || !formData.ingredients || !formData.instructions) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await axios.post(`${config.API_BASE_URL}/api/recipes`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Recipe submitted successfully!');
      navigate('/recipes');
    } catch (error) {
      console.error('Error submitting recipe:', error);
      setError(error.response?.data?.message || 'Error submitting recipe');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="form-container">
          <h2>Please Login</h2>
          <p>You need to be logged in to submit a recipe.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2>Submit a New Recipe</h2>
        
        {error && (
          <div style={{ 
            background: '#fee', 
            color: '#c33', 
            padding: '1rem', 
            borderRadius: '5px', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Recipe Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter recipe title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Brief description of your recipe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cookingTime">Cooking Time</label>
            <input
              type="text"
              id="cookingTime"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              placeholder="e.g., 30 minutes"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients * (one per line)</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
              placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs"
              style={{ minHeight: '120px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Instructions * (one step per line)</label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              required
              placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients"
              style={{ minHeight: '150px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Recipe'}
            </button>
            <Link to="/recipes" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitRecipe;