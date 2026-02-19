import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config()

export const placeOrder = async (req, res) => {
    try {
        // console.log('Order request body:', req.body);
        // console.log('Order userId from middleware:', req.userId);
        const {items, amount, address, paymentMethod} = req.body;
        const userId = req.userId;
        if (!userId) {
            // console.error('Order placement failed: userId missing');
            return res.status(400).json({ message: 'UserId missing in request' });
        }
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod,
            payment: false,
            date: Date.now()
        } 
        const newOrder = new Order(orderData);
        await newOrder.save();
        await User.findByIdAndUpdate(userId, {cartData: {}})
        return res.status(201).json({message: "Order placed successfully"});

    } catch (error) {
        console.log("Place Order Backend Error:", error);
        return res.status(500).json({message: "Order placement failed", error: error?.message || error});
    }
}   

export const placeOrderRazorpay = async (req, res) => {
    try {
        const {items, amount, address} = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            address,
            userId,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData);
        await newOrder.save();
        // Initialize Razorpay only when keys are present to avoid app crash
        // support both RAZORPAY_KEY_* and VITE_RAZORPAY_KEY_* in case env vars were set for frontend by mistake
        const sanitize = (v) => (v || '').toString().trim().replace(/^['"]|['"]$/g, '');
        const RAZORPAY_KEY_ID = sanitize(process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID);
        const RAZORPAY_KEY_SECRET = sanitize(process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET);
        const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY;

        // log presence and masked id for debugging (never log full secret)
        console.log('Razorpay key presence - id:', !!RAZORPAY_KEY_ID, 'secret:', !!RAZORPAY_KEY_SECRET);
        if (RAZORPAY_KEY_ID) {
          const masked = RAZORPAY_KEY_ID.length > 8 ? `${RAZORPAY_KEY_ID.slice(0,6)}...${RAZORPAY_KEY_ID.slice(-2)}` : '****';
          console.log('Razorpay key id (masked):', masked);
        }

        if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
            console.error('Razorpay configuration incomplete. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your backend .env.');
            return res.status(500).json({ message: 'Razorpay not configured on server. Contact admin.' });
        }

        const razorpayInstance = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET,
        });

        const currency = (DEFAULT_CURRENCY || 'INR').toUpperCase();

        const options = {
            amount: Math.round(amount * 100), // amount in the smallest currency unit
            currency,
            receipt: newOrder._id.toString(),
        };

        try {
            const razorpayOrder = await razorpayInstance.orders.create(options);
            return res.status(201).json({ message: "Order placed successfully", data: razorpayOrder });
        } catch (rzErr) {
            console.error('Razorpay order creation failed:', rzErr);
            return res.status(500).json({ message: "Razorpay order creation failed", error: rzErr?.message || rzErr });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Order placement failed", error: error?.message || error});
    }
}

//for user

export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders);
    } catch (error) {
        console.log("User Orders Backend Error:", error);
        return res.status(500).json({message: "Fetching user orders failed", error: error?.message || error});
    }
}

//for admin

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        return res.status(200).json(orders);
    } catch (error) {
        console.log("All Orders Backend Error:", error);
        return res.status(500).json({message: "Fetching all orders failed", error: error?.message || error});
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await Order.findByIdAndUpdate(orderId, {status});
        return res.status(201).json({message: "Order status updated"});
    } catch (error) {
        console.log("Update Order Status Backend Error:", error);
        return res.status(500).json({message: "Updating order status failed", error: error?.message || error});
    }
}