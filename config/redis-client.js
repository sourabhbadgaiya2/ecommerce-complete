import redis from "redis";

const redisClient = redis.createClient({
  socket: {
    host: "127.0.0.1", // Change this to your Redis server's IP address if not localhost
    port: 6379, // Default Redis port
    timeout: 5000, // Timeout in milliseconds (default is 1000ms)
  },
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected successfully!");
  } catch (err) {
    console.error("Failed to connect Redis client:", err);
  }
})();

export default redisClient;
