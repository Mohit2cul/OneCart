import express from "express";
import { addToCart, getUserCart, updateCart  } from "../controller/cart.controller.js";
import isAuth from "../middleware/isAuth.js";

const cartRoutes = express.Router();

cartRoutes.post('/add', isAuth, addToCart);
cartRoutes.post('/update', isAuth, updateCart);
cartRoutes.post('/get', isAuth, getUserCart);

export default cartRoutes;