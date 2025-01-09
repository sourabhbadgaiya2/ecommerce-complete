import redis from "redis";

const redisClient = redis.createClient();

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected successfully!");
  } catch (err) {
    console.error("Failed to connect Redis client:", err);
  }
})();

export default redisClient;
