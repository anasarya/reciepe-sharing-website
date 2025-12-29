const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? '' // Vercel will handle API routes
    : 'http://localhost:5000'
};

// Mock data for production fallback
export const mockRecipes = [
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

export default config;