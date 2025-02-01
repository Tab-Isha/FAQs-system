const redis = require('redis');
require('dotenv').config(); // Ensure environment variables are loaded

const client = redis.createClient({
  url: process.env.REDIS_URL, // Use REDIS_URL from .env
});

const connectRedis = async () => {
  try {
    await client.connect(); // Ensure connection is established properly
    console.log('✅ Redis client connected successfully!');
  } catch (err) {
    console.error('❌ Redis connection error:', err);
    process.exit(1); // Exit the process if Redis fails
  }
};

// Event listeners
client.on('error', (err) => {
  console.error('❌ Redis Error:', err);
});

module.exports = { client, connectRedis };
