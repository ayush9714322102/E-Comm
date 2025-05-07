import express from "express";
import authToken from "../middleware/authToken.js";
import addToCartViewController from "../controllers/addToCartViewProduct.js";

const router = express.Router();

router.get("/view-card-product", authToken, addToCartViewController);

export default router;