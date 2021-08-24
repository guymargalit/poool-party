// lib/redis.js
import Redis from 'ioredis';

let redis;

if (process.env.APP_URL === 'https://poool.party') {
  redis = new Redis(process.env.REDIS_URL);
}

export default redis;
