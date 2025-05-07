import express from "express";
import authToken from "../middleware/authToken.js";
import uploadProductController from "../controllers/uploadProduct.js";

const router = express.Router();

router.post("/upload-product", authToken, uploadProductController);

export default router;
