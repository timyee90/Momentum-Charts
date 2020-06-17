const redis = require('redis');

const redis_client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

redis_client.on('error', (err) => {
  console.log(`Error: `, err);
});

module.exports = redis_client;
