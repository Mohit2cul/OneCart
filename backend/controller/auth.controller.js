import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import validator from "validator";
import { genToken } from "../config/token.js";
import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";
const getCookieOptions = (maxAgeMs) => ({
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "None" : "Strict",
  maxAge: maxAgeMs,
});

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ name, email, password: hashPassword });
      let token = await genToken(user._id);
      res.cookie("token", token, getCookieOptions(7 * 24 * 60 * 60 * 1000));
      return res.status(201).json(user);
    } catch (dbError) {
      // Handle duplicate key error (unique constraint)
      if (dbError.code === 11000) {
        const field = Object.keys(dbError.keyPattern)[0];
        return res.status(400).json({ message: `User already exists with this ${field}` });
      }
      return res.status(500).json({ message: `Database error: ${dbError.message}` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Register error: ${error.message}` });
  }
}

// Get current user from JWT token in cookie (protected by isAuth middleware)
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Getting user with ID:", userId);
    
    if (!userId) {
      return res.status(401).json({ message: "User ID not found in token" });
    }
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("Current user fetched:", user.email);
    return res.status(200).json(user);
  } catch (error) {
    console.log("Get current user error:", error.message);
    return res.status(500).json({ message: `Get current user error: ${error.message}` });
  }
};



export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, getCookieOptions(7 * 24 * 60 * 60 * 1000));
    return res.status(201).json({ name: user.name, email: user.email });
  } catch (error) {
    return res.status(500).json({ message: `Login error: ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Strict",
    });
    console.log("User logged out successfully");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout error:", error.message);
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    console.log("Google login request received");
    let { name, email } = req.body;
    
    if (!name || !email) {
      console.log("Missing name or email in request");
      return res.status(400).json({ message: "Name and email are required" });
    }
    
    console.log("Looking for user with email:", email);
    let user = await User.findOne({email});
    
    if (!user) {
      console.log("User not found, creating new user");
      user = await User.create({ name, email });
      console.log("New user created:", user._id);
    } else {
      console.log("Existing user found:", user._id);
    }
    
    let token = await genToken(user._id);
    console.log("Token generated successfully");
    
    res.cookie("token", token, getCookieOptions(7 * 24 * 60 * 60 * 1000));
    console.log("Cookie set with options:", getCookieOptions(7 * 24 * 60 * 60 * 1000));
    
    return res.status(200).json({ 
      name: user.name, 
      email: user.email,
      success: true 
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({ 
      message: "Google login failed", 
      error: error.message 
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      let token = jwt.sign({ adminEmail: email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("token", token, getCookieOptions(1 * 24 * 60 * 60 * 1000));
      return res.status(201).json({ name: "Admin", email: process.env.ADMIN_EMAIL });
    }
    return res.status(400).json({ message: "Invalid admin credentials" });
  } catch (error) {
    return res.status(500).json({ message: `Admin login error: ${error.message}` });
  }
};