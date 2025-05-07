import express from "express";
import authToken from "../middleware/authToken.js";
import updateProductController from "../controllers/updateProduct.js";

const router = express.Router();

router.post("/update-product", authToken, updateProductController);

export default router;
