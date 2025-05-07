import express from "express";
import getProductDetailsController from "../controllers/getProductDetails.js";

const router = express.Router();

router.post("/product-details", getProductDetailsController);

export default router;
