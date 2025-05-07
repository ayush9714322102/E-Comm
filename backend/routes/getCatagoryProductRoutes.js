import express from "express";
import getCatagoryProductController from "../controllers/getCatagoryProductOne.js";
import SearchProduct from "../controllers/searchProductController.js";
import filterProduct from "../controllers/filterProduct.js";

const router = express.Router();

router.get("/get-catagoryproduct", getCatagoryProductController);
router.get("/search",SearchProduct)
router.post("/filter-product",filterProduct)

export default router;
