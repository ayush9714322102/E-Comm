import express from "express";
import getAllProductController from "../controllers/getProduct.js";

const router = express.Router();

router.get("/get-product", getAllProductController);

export default router;
