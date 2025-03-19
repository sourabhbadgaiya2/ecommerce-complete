import Redis from "ioredis";
import config from "../config/env.config.js";

// Redis Client Configuration
const redisClient = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASS,
  connectTimeout: config.REDIS_TIME || 10000, // Fallback to 10s if not defined
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    console.log(`Reconnecting to Redis in ${delay} ms...`);
    return delay;
  },
  maxRetriesPerRequest: 3, // Avoid indefinite retries
});

// Connection Events
redisClient.on("connect", () => {
  console.log("✅ Redis connected successfully.");
});

redisClient.on("error", (err) => {
  console.error("❗ Redis connection error:", err);
});

redisClient.on("reconnecting", (time) => {
  console.warn(`⚠️ Attempting to reconnect to Redis... Attempt: ${time}`);
});

redisClient.on("end", () => {
  console.warn("⚠️ Redis connection closed.");
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Closing Redis connection...");
  await redisClient.quit();
  process.exit(0);
});

export default redisClient;
