import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    search: searchParams.get('search') || ''
  });

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Vegan', 'Desserts', 'Snacks'];

  useEffect(() => {
    fetchRecipes();
  }, [filters]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category !== 'All') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);

      const response = await axios.get(`/api/recipes?${params}`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading recipes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="recipes-section">
        <div className="section-header">
          <h1>Browse Recipes</h1>
          <div className="filters">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search recipes..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd' }}
            />
          </div>
        </div>

        {recipes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>No recipes found</h3>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-card-content">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  <div className="recipe-meta">
                    <span className="category">{recipe.category}</span>
                    <span className="difficulty">{recipe.difficulty}</span>
                  </div>
                  <div className="recipe-meta">
                    <span className="time">⏱️ {recipe.cookingTime}</span>
                    <span className="rating">⭐ {recipe.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default RecipeList;