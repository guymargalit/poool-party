// lib/redis.js
import Redis from 'ioredis';

let redis;

if (process.env.NODE_ENV === 'production') {
  redis = new Redis(process.env.REDIS_URL);
}

export default redis;
