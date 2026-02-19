import uploadOnCloudinary from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";

export const addProduct = async (req, res) => {
    try {
        let {name, description, category, price, subCategory, sizes, bestSeller} = req.body;
        // console.log("Request Body:", req.body);
        // console.log("Request Files:", req.files);


        // Basic validation
        if (!name || !description || !category || !subCategory || !price) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (!req.files || !req.files.image1[0].path || !req.files.image2[0].path || !req.files.image3[0].path || !req.files.image4[0].path) {
            return res.status(400).json({ message: "All four images are required" });
        }

        // Upload images
        let image1 = await uploadOnCloudinary(req.files.image1[0].path);
        let image2 = await uploadOnCloudinary(req.files.image2[0].path);
        let image3 = await uploadOnCloudinary(req.files.image3[0].path);
        let image4 = await uploadOnCloudinary(req.files.image4[0].path);
        
        let productData = {
            name, 
            description, 
            category, 
            price: Number(price), 
            subCategory, 
            sizes: typeof sizes === 'string' ? JSON.parse(sizes) : Array.isArray(sizes) ? sizes : [],
            bestSeller: typeof bestSeller === 'string' ? bestSeller === 'true' : Boolean(bestSeller),
            image1,
            image2,
            image3,
            image4
        }
        const product = await Product.create(productData);
        return res.status(201).json({message: "Product added successfully", product});

    } catch (error) {
        console.error("Add Product Backend Error:", error);
        return res.status(500).json({message: "Product creation failed", error: error?.message || error});
    }
}

export const listProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({products}); 
    } catch (error) {
        console.error("List Products Backend Error:", error);
        return res.status(500).json({message: "Product retrieval failed", error: error?.message || error});
    }
}

export const removeProduct = async (req, res) => {
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json({message: "Product deleted successfully", product});
    } catch (error) {
        console.log("Remove Product Backend Error:", error);
        return res.status(500).json({message: "Product deletion failed", error: error?.message || error});
    }
}