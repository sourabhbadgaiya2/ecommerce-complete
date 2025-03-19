import Redis from "ioredis";
import config from "../config/env.config.js";

// Upstash Redis Client Configuration using URL
const redisClient = new Redis(config.UPSTASH_REDIS_URL, {
  tls: {
    rejectUnauthorized: false, // For secure connection, optional depending on cert
  },
});

// Connection Events
redisClient.on("connect", () => {
  console.log("✅ Upstash Redis connected successfully.");
});

redisClient.on("error", (err) => {
  console.error("❗ Upstash Redis connection error:", err);
});

redisClient.on("reconnecting", (time) => {
  console.warn(
    `⚠️ Attempting to reconnect to Upstash Redis... Attempt: ${time}`
  );
});

redisClient.on("end", () => {
  console.warn("⚠️ Upstash Redis connection closed.");
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Closing Upstash Redis connection...");
  await redisClient.quit();
  process.exit(0);
});

export default redisClient;
