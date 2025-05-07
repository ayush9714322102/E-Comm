import express from "express";
import getCatagoryWiseProductController from "../controllers/getCategoryWiseProduct.js";

const router = express.Router();

router.post("/category-product", getCatagoryWiseProductController);

export default router;
