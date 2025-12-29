# Recipe Sharing Website

A full-stack recipe sharing platform built with React and Express.js featuring user authentication, recipe management, and a responsive design.

## Features

### Frontend
- **Homepage**: Logo, navigation, search bar, hero section with CTA buttons
- **Recipe Categories**: Featured categories (Breakfast, Vegan, Desserts, etc.)
- **Recipe List**: Grid/list view with filtering by category and search
- **Recipe Detail**: Full recipe view with ingredients and instructions
- **Submit Recipe**: Form for authenticated users to add recipes
- **User Authentication**: Login/Register with JWT
- **Responsive Design**: Mobile-friendly interface

### Backend
- **Express Server**: RESTful API with CORS support
- **JWT Authentication**: Secure user login and registration
- **Recipe API**: GET, POST, DELETE endpoints for recipes
- **Search & Filter**: Recipe filtering by category and search terms
- **In-memory Storage**: Simple data storage (easily replaceable with database)

## Quick Start

### 1. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Start the Application

```bash
# Start the backend server (runs on port 5000)
npm run server

# In a new terminal, start the frontend (runs on port 3000)
npm run client
```

### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Recipes
- `GET /api/recipes` - Get all recipes (with optional category/search filters)
- `GET /api/recipes/:id` - Get specific recipe
- `POST /api/recipes` - Create new recipe (requires authentication)
- `DELETE /api/recipes/:id` - Delete recipe (requires authentication)

### Categories
- `GET /api/categories` - Get all recipe categories

## Project Structure

```
recipe-sharing-website/
├── server/
│   └── server.js          # Express server with API routes
├── client/
│   ├── public/
│   │   └── index.html     # HTML template
│   └── src/
│       ├── components/
│       │   └── Header.js  # Navigation header
│       ├── pages/
│       │   ├── HomePage.js      # Landing page
│       │   ├── RecipeList.js    # Recipe browsing
│       │   ├── RecipeDetail.js  # Individual recipe
│       │   ├── SubmitRecipe.js  # Recipe submission
│       │   ├── Login.js         # User login
│       │   ├── Register.js      # User registration
│       │   └── UserProfile.js   # User profile
│       ├── App.js         # Main app component
│       ├── index.js       # React entry point
│       └── index.css      # Global styles
├── .env                   # Environment variables
├── package.json           # Server dependencies
└── README.md             # This file
```

## Usage

1. **Browse Recipes**: Visit the homepage to see featured recipes and categories
2. **Search**: Use the search bar to find recipes by title or ingredients
3. **Filter**: Use category filters on the recipe list page
4. **Register/Login**: Create an account to submit recipes
5. **Submit Recipe**: Fill out the form with title, ingredients, instructions, etc.
6. **View Details**: Click any recipe to see full details with ingredients and steps

## Sample Data

The application comes with 3 sample recipes:
- Classic Pancakes (Breakfast)
- Vegan Buddha Bowl (Vegan)
- Chocolate Chip Cookies (Desserts)

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run client` - Start React development server
- `npm run server` - Start Express server with nodemon

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Image upload for recipes
- Recipe ratings and reviews
- User recipe management
- Advanced search filters
- Recipe favorites
- Social features (following users)
- Email verification
- Password reset functionality

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- CSS3 with responsive design

### Backend
- Node.js
- Express.js
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## License

MIT License