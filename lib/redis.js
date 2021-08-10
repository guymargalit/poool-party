// lib/redis.js
import Redis from 'ioredis';

let redis;

if (process.env.NODE_ENV === 'production') {
  redis = new Redis(process.env.REDIS_URL);
} else {
  if (!global.redis) {
    global.redis = new Redis(process.env.REDIS_URL);
  }
  redis = global.redis;
}

export default redis;
