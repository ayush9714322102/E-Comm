import express from "express";
import authToken from "../middleware/authToken.js";
import updateAddToCartProduct from "../controllers/updateAddToCartProduct.js";

const router = express.Router();

router.post("/update-card-product", authToken, updateAddToCartProduct);

export default router;