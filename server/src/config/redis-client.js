import redis from "redis";
import config from "../config/env.config.js";

const redisClient = redis.createClient({
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    timeout: config.REDIS_TIME,
  },
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected successfully!");
  } catch (err) {
    console.error("Failed to connect Redis client:", err);
    next(err);
  }
})();

export default redisClient;
