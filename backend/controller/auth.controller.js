// Get current user from cookie (basic version)
export const getCurrentUser = async (req, res) => {
  try {
    // You may want to use JWT or session to identify the user. Here, we use email from query or body for demo.
    const email = req.query.email || req.body?.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required to get current user" });
    }
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get current user error: ${error.message}` });
  }
};
import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";

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
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
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
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(201).json({ name: user.name, email: user.email });
  } catch (error) {
    return res.status(500).json({ message: `Login error: ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error: ${error}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    let user = await User.findOne({email});
    if (!user) {
      user = await User.create({ name, email });
    }
    
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    console.log("google login error:", error);
    return res.status(500).json({ message: "Google login error", error });
  }
};

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      let token = await genToken1(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 1  * 24 * 60 * 60 * 1000, // 7 days
      });
      return res.status(201).json({ name: "Admin", email: process.env.ADMIN_EMAIL });
    }
    return res.status(400).json({ message: "Invalid admin credentials" });
  } catch (error) {
    return res.status(500).json({ message: `Admin login error: ${error.message}` });
  }
}