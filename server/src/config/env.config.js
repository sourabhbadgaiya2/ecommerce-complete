import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

const _config = {
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_Time: process.env.REDIS_Time,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
};

const config = Object.freeze(_config);

export default config;
