import mongoose from "mongoose";
import config from "../config/env.config.js";

const connectDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log(" db connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
