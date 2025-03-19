import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

const _config = {
  BRAIN_TREE_MERCHANT_ID: process.env.BRAIN_TREE_MERCHANT_ID,
  BRAIN_TREE_PUBLIC_KEY: process.env.BRAIN_TREE_PUBLIC_KEY,
  BRAIN_TREE_PRIVATE_KEY: process.env.BRAIN_TREE_PRIVATE_KEY,
  UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
  // REDIS_HOST: process.env.REDIS_HOST,
  // REDIS_PORT: process.env.REDIS_PORT,
  // REDIS_Time: process.env.REDIS_Time,
  // REDIS_PASS: process.env.REDIS_PASS,
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};

const config = Object.freeze(_config);

export default config;
