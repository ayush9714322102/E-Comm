import express from "express";
import authToken from "../middleware/authToken.js";
import deleteAddToCartProduct from "../controllers/deleteAddToCartProduct.js";

const router = express.Router();

router.post("/delete-card-product", authToken, deleteAddToCartProduct);

export default router;