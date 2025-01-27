import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/env.config.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "User name is required."],
      maxlength: [32, "User name cannot exceed 32 characters."],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required."],
      unique: [true, "This email is already registered."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Instance Method: Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    config.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

// Instance Method: Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static Method: Hash password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

export default User;
