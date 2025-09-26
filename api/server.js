const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Utility function to read JSON files
const readJsonFile = (filename) => {
  try {
    const filePath = path.join(__dirname, '..', 'src', 'data', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Lala Store API is running',
    timestamp: new Date().toISOString()
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  const products = readJsonFile('products.json');
  if (!products) {
    return res.status(500).json({ error: 'Failed to load products' });
  }
  
  // Optional filtering by category
  const { category, inStock } = req.query;
  let filteredProducts = products;
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (inStock === 'true') {
    filteredProducts = filteredProducts.filter(p => p.inStock === true);
  }
  
  res.json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts
  });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const products = readJsonFile('products.json');
  if (!products) {
    return res.status(500).json({ error: 'Failed to load products' });
  }
  
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// Get all collections
app.get('/api/collections', (req, res) => {
  const collections = readJsonFile('collections.json');
  if (!collections) {
    return res.status(500).json({ error: 'Failed to load collections' });
  }
  
  // Optional filtering by featured or season
  const { featured, season } = req.query;
  let filteredCollections = collections;
  
  if (featured === 'true') {
    filteredCollections = filteredCollections.filter(c => c.featured === true);
  }
  
  if (season) {
    filteredCollections = filteredCollections.filter(c => 
      c.season.toLowerCase().includes(season.toLowerCase())
    );
  }
  
  res.json({
    success: true,
    count: filteredCollections.length,
    data: filteredCollections
  });
});

// Get collection by ID with products
app.get('/api/collections/:id', (req, res) => {
  const collections = readJsonFile('collections.json');
  const products = readJsonFile('products.json');
  
  if (!collections || !products) {
    return res.status(500).json({ error: 'Failed to load data' });
  }
  
  const collection = collections.find(c => c.id === req.params.id);
  if (!collection) {
    return res.status(404).json({ error: 'Collection not found' });
  }
  
  // Get full product details for this collection
  const collectionProducts = products.filter(p => 
    collection.products.includes(p.id)
  );
  
  res.json({
    success: true,
    data: {
      ...collection,
      productDetails: collectionProducts
    }
  });
});

// Get all news
app.get('/api/news', (req, res) => {
  const news = readJsonFile('news.json');
  if (!news) {
    return res.status(500).json({ error: 'Failed to load news' });
  }
  
  // Optional filtering by category
  const { category, limit } = req.query;
  let filteredNews = news;
  
  if (category) {
    filteredNews = filteredNews.filter(n => 
      n.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  // Sort by date (newest first)
  filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Limit results if specified
  if (limit && !isNaN(limit)) {
    filteredNews = filteredNews.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    count: filteredNews.length,
    data: filteredNews
  });
});

// Get news by ID
app.get('/api/news/:id', (req, res) => {
  const news = readJsonFile('news.json');
  if (!news) {
    return res.status(500).json({ error: 'Failed to load news' });
  }
  
  const article = news.find(n => n.id === req.params.id);
  if (!article) {
    return res.status(404).json({ error: 'News article not found' });
  }
  
  res.json({
    success: true,
    data: article
  });
});

// Get categories
app.get('/api/categories', (req, res) => {
  const products = readJsonFile('products.json');
  if (!products) {
    return res.status(500).json({ error: 'Failed to load products' });
  }
  
  const categories = [...new Set(products.map(p => p.category))];
  
  res.json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// Search products
app.get('/api/search', (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const products = readJsonFile('products.json');
  if (!products) {
    return res.status(500).json({ error: 'Failed to load products' });
  }
  
  let results = products.filter(p => 
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.description.toLowerCase().includes(q.toLowerCase())
  );
  
  if (category) {
    results = results.filter(p => 
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (minPrice) {
    results = results.filter(p => p.price >= parseFloat(minPrice));
  }
  
  if (maxPrice) {
    results = results.filter(p => p.price <= parseFloat(maxPrice));
  }
  
  res.json({
    success: true,
    count: results.length,
    query: q,
    data: results
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: 'Please check the API documentation for available endpoints'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Lala Store API running on http://localhost:${PORT}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   GET /api/health`);
  console.log(`   GET /api/products`);
  console.log(`   GET /api/products/:id`);
  console.log(`   GET /api/collections`);
  console.log(`   GET /api/collections/:id`);
  console.log(`   GET /api/news`);
  console.log(`   GET /api/news/:id`);
  console.log(`   GET /api/categories`);
  console.log(`   GET /api/search`);
});

module.exports = app;
