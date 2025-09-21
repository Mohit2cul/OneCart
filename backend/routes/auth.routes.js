import express from "express";
import { register, login, logout, googleLogin, getCurrentUser, adminLogin } from "../controller/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get('/logout', logout);
authRoutes.post('/googleLogin', googleLogin);
authRoutes.post('/adminLogin', adminLogin);

export default authRoutes;

// Add getCurrentUser route
authRoutes.get('/getCurrentUser', getCurrentUser);
