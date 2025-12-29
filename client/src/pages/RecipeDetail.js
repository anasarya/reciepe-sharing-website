import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_BASE_URL}/api/recipes/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError('Recipe not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading recipe...</h2>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Recipe not found</h2>
        <Link to="/recipes" className="btn btn-primary">
          Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="recipe-detail">
        <div className="recipe-header">
          <h1>{recipe.title}</h1>
          <div className="recipe-meta" style={{ justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <span className="category">📂 {recipe.category}</span>
            <span className="difficulty">📊 {recipe.difficulty}</span>
            <span className="time">⏱️ {recipe.cookingTime}</span>
            <span className="rating">⭐ {recipe.rating}</span>
          </div>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1rem' }}>
            {recipe.description}
          </p>
          <p style={{ color: '#888' }}>By {recipe.author}</p>
          <img src={recipe.image} alt={recipe.title} />
        </div>

        <div className="recipe-content">
          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>✓ {ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="instructions">
            <h3>Instructions</h3>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/recipes" className="btn btn-primary">
            Back to Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;