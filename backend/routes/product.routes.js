import express from "express";
import { addProduct, listProducts, removeProduct } from "../controller/product.controller.js";
import upload from "../middleware/multer.js";
// import { adminAuth } from "../middleware/adminAuth.js";

let productRoute = express.Router();

productRoute.post(
  "/addproduct",
  upload.fields([
    {
      name: "image1",
      maxCount: 1,
    },
    {
      name: "image2",
      maxCount: 1,
    },
    {
      name: "image3",
      maxCount: 1,
    },
    {
      name: "image4",
      maxCount: 1,
    },
  ]),
  addProduct
);

productRoute.get("/list", listProducts);
productRoute.post("/remove/:id", removeProduct);

export default productRoute;