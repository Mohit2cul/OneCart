import express from "express";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders } from "../controller/order.controller.js";

const orderRoutes = express.Router();

//for user
orderRoutes.post("/placeOrder", isAuth, placeOrder);
orderRoutes.post("/razorpay", isAuth, placeOrderRazorpay);
orderRoutes.post("/userorders", isAuth, userOrders);

//for admin
orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateStatus);

export default orderRoutes;
