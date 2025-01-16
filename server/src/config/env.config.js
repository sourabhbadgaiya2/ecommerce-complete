import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

const _config = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
};

const config = Object.freeze(_config);

export default config;
