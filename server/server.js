const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage (replace with database in production)
let users = [];
let recipes = [
  {
    id: 1,
    title: "Classic Pancakes",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    description: "Fluffy and delicious pancakes perfect for breakfast",
    ingredients: ["2 cups flour", "2 eggs", "1 cup milk", "2 tbsp sugar", "1 tsp baking powder"],
    instructions: ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle until golden"],
    category: "Breakfast",
    difficulty: "Easy",
    cookingTime: "15 minutes",
    rating: 4.5,
    author: "Chef John"
  },
  {
    id: 2,
    title: "Vegan Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    description: "Nutritious and colorful vegan bowl with quinoa and vegetables",
    ingredients: ["1 cup quinoa", "Mixed vegetables", "Chickpeas", "Tahini dressing"],
    instructions: ["Cook quinoa", "Roast vegetables", "Assemble bowl", "Drizzle with dressing"],
    category: "Vegan",
    difficulty: "Medium",
    cookingTime: "30 minutes",
    rating: 4.8,
    author: "Green Chef"
  },
  {
    id: 3,
    title: "Chocolate Chip Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    description: "Classic homemade chocolate chip cookies",
    ingredients: ["2 cups flour", "1 cup butter", "1 cup brown sugar", "2 eggs", "Chocolate chips"],
    instructions: ["Cream butter and sugar", "Add eggs and flour", "Fold in chocolate chips", "Bake at 375°F"],
    category: "Desserts",
    difficulty: "Easy",
    cookingTime: "25 minutes",
    rating: 4.7,
    author: "Baker Mary"
  }
];

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword
    };
    
    users.push(user);
    
    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    
    res.status(201).json({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Recipe routes
app.get('/api/recipes', (req, res) => {
  const { category, search } = req.query;
  let filteredRecipes = recipes;

  if (category && category !== 'All') {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  res.json(filteredRecipes);
});

app.get('/api/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  res.json(recipe);
});

app.post('/api/recipes', authenticateToken, (req, res) => {
  try {
    const { title, description, ingredients, instructions, category, cookingTime } = req.body;
    
    const newRecipe = {
      id: recipes.length + 1,
      title,
      image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400",
      description,
      ingredients: ingredients.split('\n').filter(i => i.trim()),
      instructions: instructions.split('\n').filter(i => i.trim()),
      category,
      difficulty: "Medium",
      cookingTime,
      rating: 0,
      author: req.user.email
    };

    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/recipes/:id', authenticateToken, (req, res) => {
  const recipeIndex = recipes.findIndex(r => r.id === parseInt(req.params.id));
  if (recipeIndex === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  recipes.splice(recipeIndex, 1);
  res.json({ message: 'Recipe deleted successfully' });
});

// Categories endpoint
app.get('/api/categories', (req, res) => {
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Vegan', 'Desserts', 'Snacks'];
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});