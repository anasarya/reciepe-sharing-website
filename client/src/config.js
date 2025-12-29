const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? '' // Vercel will handle API routes
    : 'http://localhost:5000'
};

export default config;