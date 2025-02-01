const express = require('express');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const faqRoutes = require('./routes/faqRoutes');
const app = express();

// Connect to Database
connectDB().catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
  process.exit(1); // Exit the process if MongoDB fails to connect
});

// Connect to Redis
connectRedis().catch((err) => {
  console.error('❌ Redis connection failed:', err);
  process.exit(1); // Exit the process if Redis fails to connect
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/faqs', faqRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
